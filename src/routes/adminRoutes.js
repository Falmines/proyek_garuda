const router = require('express').Router();
const controller = require('../controllers/adminController');
const asyncHandler = require('../middleware/asyncHandler');
const { rateLimit, requireAdmin } = require('../middleware/security');

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, prefix: 'admin-login' });

router.get('/login', (req, res) => res.render('login', { title: 'Login Admin', error: null }));
router.post('/login', loginLimiter, asyncHandler(controller.login));
router.post('/logout', requireAdmin, controller.logout);
router.get('/', requireAdmin, asyncHandler(controller.dashboard));
router.post('/project/:id', requireAdmin, asyncHandler(controller.updateProject));

module.exports = router;
