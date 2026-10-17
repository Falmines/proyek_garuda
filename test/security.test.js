const test = require('node:test');
const assert = require('node:assert/strict');
const {
  csrfProtection,
  rateLimit,
  requireAdmin,
  securityHeaders
} = require('../src/middleware/security');
const { validateContact, validateProject, parsePositiveId } = require('../src/utils/validation');

function mockResponse() {
  return {
    headers: {},
    statusCode: 200,
    body: undefined,
    set(headers) {
      if (typeof headers === 'string') {
        this.headers[headers] = arguments[1];
      } else {
        Object.assign(this.headers, headers);
      }
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    send(body) {
      this.body = body;
      return this;
    },
    redirect(path) {
      this.redirectPath = path;
      return this;
    }
  };
}

function mockRequest({ method = 'GET', originalUrl = '/', ip = '192.0.2.20', token, body = {}, user, role } = {}) {
  const req = {
    method,
    originalUrl,
    path: originalUrl,
    ip,
    socket: { remoteAddress: ip },
    body,
    session: { csrfToken: token, user: user ? { role } : undefined },
    headers: {},
    get(name) {
      return this.headers[name.toLowerCase()];
    }
  };
  return req;
}

test('sets baseline browser security headers', () => {
  const req = mockRequest();
  const res = mockResponse();
  let called = false;

  securityHeaders(req, res, () => { called = true; });

  assert.equal(called, true);
  assert.equal(res.headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(res.headers['X-Frame-Options'], 'DENY');
  assert.match(res.headers['Content-Security-Policy'], /frame-ancestors 'none'/);
});

test('rejects missing or mismatched CSRF tokens on state-changing requests', () => {
  const req = mockRequest({ method: 'POST', originalUrl: '/api/v1/admin/projects', token: 'expected' });
  const res = mockResponse();
  let called = false;

  csrfProtection(req, res, () => { called = true; });

  assert.equal(called, false);
  assert.equal(res.statusCode, 403);
  assert.equal(res.body.error.code, 'CSRF_INVALID');
});

test('accepts a valid CSRF token', () => {
  const req = mockRequest({ method: 'PATCH', originalUrl: '/admin/project/1', token: 'same-token' });
  req.headers['x-csrf-token'] = 'same-token';
  const res = mockResponse();
  let called = false;

  csrfProtection(req, res, () => { called = true; });

  assert.equal(called, true);
});

test('allows the public contact API without a browser CSRF token', () => {
  const req = mockRequest({ method: 'POST', originalUrl: '/api/v1/contact' });
  const res = mockResponse();
  let called = false;

  csrfProtection(req, res, () => { called = true; });

  assert.equal(called, true);
});

test('accepts a configured bearer token for API mutations without a session CSRF token', () => {
  const previous = process.env.ADMIN_API_TOKEN;
  process.env.ADMIN_API_TOKEN = 'a'.repeat(40);
  const req = mockRequest({ method: 'POST', originalUrl: '/api/v1/admin/projects' });
  req.headers.authorization = `Bearer ${process.env.ADMIN_API_TOKEN}`;
  const res = mockResponse();
  let called = false;

  try {
    csrfProtection(req, res, () => { called = true; });
    assert.equal(called, true);
  } finally {
    if (previous === undefined) delete process.env.ADMIN_API_TOKEN;
    else process.env.ADMIN_API_TOKEN = previous;
  }
});

test('does not let an API bearer token bypass CSRF on browser forms', () => {
  const previous = process.env.ADMIN_API_TOKEN;
  process.env.ADMIN_API_TOKEN = 'b'.repeat(40);
  const req = mockRequest({ method: 'POST', originalUrl: '/kontak' });
  req.headers.authorization = `Bearer ${process.env.ADMIN_API_TOKEN}`;
  const res = mockResponse();
  let called = false;

  try {
    csrfProtection(req, res, () => { called = true; });
    assert.equal(called, false);
    assert.equal(res.statusCode, 403);
  } finally {
    if (previous === undefined) delete process.env.ADMIN_API_TOKEN;
    else process.env.ADMIN_API_TOKEN = previous;
  }
});

test('rate limits API requests and returns a structured error', () => {
  const limiter = rateLimit({ windowMs: 60_000, max: 1, prefix: `unit-${Date.now()}-${Math.random()}` });
  const req = mockRequest({ originalUrl: '/api/v1/projects' });
  const firstResponse = mockResponse();
  const secondResponse = mockResponse();
  let firstPassed = false;
  let secondPassed = false;

  limiter(req, firstResponse, () => { firstPassed = true; });
  limiter(req, secondResponse, () => { secondPassed = true; });

  assert.equal(firstPassed, true);
  assert.equal(secondPassed, false);
  assert.equal(secondResponse.statusCode, 429);
  assert.equal(secondResponse.body.error.code, 'RATE_LIMITED');
  assert.ok(secondResponse.headers['Retry-After']);
});

test('admin API token grants admin access without exposing it in response', () => {
  const previous = process.env.ADMIN_API_TOKEN;
  process.env.ADMIN_API_TOKEN = 'c'.repeat(40);
  const req = mockRequest({ originalUrl: '/api/v1/admin/projects' });
  req.headers.authorization = `Bearer ${process.env.ADMIN_API_TOKEN}`;
  const res = mockResponse();
  let called = false;

  try {
    requireAdmin(req, res, () => { called = true; });
    assert.equal(called, true);
    assert.equal(req.apiAdminAuthenticated, true);
  } finally {
    if (previous === undefined) delete process.env.ADMIN_API_TOKEN;
    else process.env.ADMIN_API_TOKEN = previous;
  }
});

test('admin API requires authorization and responds as JSON', () => {
  const req = mockRequest({ originalUrl: '/api/v1/admin/projects' });
  const res = mockResponse();
  let called = false;

  requireAdmin(req, res, () => { called = true; });

  assert.equal(called, false);
  assert.equal(res.statusCode, 401);
  assert.equal(res.body.error.code, 'AUTH_REQUIRED');
});

test('validates contact data and requires a reply address', () => {
  assert.equal(validateContact({
    name: 'Naufal',
    email: 'naufal@example.com',
    message: 'Halo'
  }).data.name, 'Naufal');

  assert.match(validateContact({ name: 'Naufal', message: 'Halo' }).error, /email atau nomor telepon/);
  assert.match(validateContact({
    name: 'Naufal',
    email: 'not-an-email',
    message: 'Halo'
  }).error, /email tidak valid/);
});

test('rejects unsafe project paths and unknown fields', () => {
  const project = {
    slug: 'safe-project',
    title: 'Safe project',
    category: 'Riset',
    summary: 'Summary',
    description: 'Description',
    image: 'https://example.com/image.webp',
    status: 'Konsep R&D'
  };
  assert.match(validateProject(project).error, /gambar lokal/);
  assert.match(validateProject({ title: 'x', role: 'admin' }, { partial: true }).error, /tidak diizinkan/);
  assert.match(validateProject({ progress: '' }, { partial: true }).error, /angka bulat/);
});

test('validates project data and positive database IDs', () => {
  const result = validateProject({
    slug: 'safe-project',
    title: 'Safe project',
    category: 'Riset',
    summary: 'Summary',
    description: 'Description',
    image: '/images/garuda-armor.webp',
    status: 'Konsep R&D'
  });

  assert.equal(result.data.progress, 0);
  assert.equal(parsePositiveId('42'), 42);
  assert.equal(parsePositiveId('0'), null);
  assert.equal(parsePositiveId('1e3'), null);
});
