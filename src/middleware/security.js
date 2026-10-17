const crypto = require('node:crypto');

const rateLimitBuckets = new Map();
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

function isApiRequest(req) {
  return req.originalUrl.startsWith('/api/');
}

function securityHeaders(req, res, next) {
  res.set({
    'Content-Security-Policy': [
      "default-src 'self'",
      "base-uri 'self'",
      "connect-src 'self'",
      "font-src 'self' data:",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "img-src 'self' data:",
      "object-src 'none'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'"
    ].join('; '),
    'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-Permitted-Cross-Domain-Policies': 'none'
  });

  if (process.env.NODE_ENV === 'production') {
    res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  next();
}

function rateLimit({ windowMs, max, prefix }) {
  return (req, res, next) => {
    const now = Date.now();
    const key = `${prefix}:${req.ip || req.socket.remoteAddress || 'unknown'}`;
    let bucket = rateLimitBuckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + windowMs };
      rateLimitBuckets.set(key, bucket);
    }

    bucket.count += 1;
    res.set({
      'RateLimit-Limit': String(max),
      'RateLimit-Remaining': String(Math.max(0, max - bucket.count)),
      'RateLimit-Reset': String(Math.ceil(bucket.resetAt / 1000))
    });

    if (rateLimitBuckets.size > 5000) {
      for (const [bucketKey, value] of rateLimitBuckets) {
        if (value.resetAt <= now) rateLimitBuckets.delete(bucketKey);
      }
      if (rateLimitBuckets.size > 5000) {
        rateLimitBuckets.delete(rateLimitBuckets.keys().next().value);
      }
    }

    if (bucket.count <= max) return next();

    res.set('Retry-After', String(Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))));
    if (isApiRequest(req)) {
      return res.status(429).json({
        error: { code: 'RATE_LIMITED', message: 'Terlalu banyak permintaan. Coba lagi nanti.' }
      });
    }
    return res.status(429).send('Terlalu banyak permintaan. Coba lagi nanti.');
  };
}

function createCsrfToken(req, res, next) {
  if (req.method === 'GET' && !req.path.startsWith('/api/')) {
    req.session.csrfToken ||= crypto.randomBytes(32).toString('hex');
  }
  res.locals.csrfToken = req.session.csrfToken || '';
  next();
}

function isValidApiAdminToken(req) {
  if (req.apiAdminAuthenticated) return true;

  const configuredToken = process.env.ADMIN_API_TOKEN;
  const authorization = req.get('authorization') || '';
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!configuredToken || configuredToken.length < 32 || !match) return false;

  const expected = Buffer.from(configuredToken);
  const supplied = Buffer.from(match[1]);
  if (expected.length !== supplied.length || !crypto.timingSafeEqual(expected, supplied)) return false;

  req.apiAdminAuthenticated = true;
  return true;
}

function csrfProtection(req, res, next) {
  const requestPath = req.originalUrl.split('?')[0];
  const publicContactApi = req.method === 'POST' && requestPath === '/api/v1/contact';
  if (SAFE_METHODS.has(req.method)
    || publicContactApi
    || (isApiRequest(req) && isValidApiAdminToken(req))) return next();

  const expected = req.session && req.session.csrfToken;
  const supplied = req.get('x-csrf-token') || (req.body && req.body._csrf);
  const expectedBuffer = Buffer.from(typeof expected === 'string' ? expected : '');
  const suppliedBuffer = Buffer.from(typeof supplied === 'string' ? supplied : '');
  const valid = expectedBuffer.length > 0
    && expectedBuffer.length === suppliedBuffer.length
    && crypto.timingSafeEqual(expectedBuffer, suppliedBuffer);

  if (valid) return next();

  if (isApiRequest(req)) {
    return res.status(403).json({
      error: { code: 'CSRF_INVALID', message: 'Token CSRF tidak valid atau sudah kedaluwarsa.' }
    });
  }
  return res.status(403).send('Permintaan ditolak karena token keamanan tidak valid. Muat ulang halaman lalu coba lagi.');
}

function requireAdmin(req, res, next) {
  if ((isApiRequest(req) && isValidApiAdminToken(req))
    || (req.session && req.session.user && req.session.user.role === 'admin')) {
    return next();
  }

  if (isApiRequest(req)) {
    return res.status(401).json({
      error: { code: 'AUTH_REQUIRED', message: 'Autentikasi admin diperlukan.' }
    });
  }
  return res.redirect('/admin/login');
}

module.exports = {
  createCsrfToken,
  csrfProtection,
  rateLimit,
  requireAdmin,
  securityHeaders
};
