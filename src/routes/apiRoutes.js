const router = require('express').Router();
const controller = require('../controllers/apiController');
const asyncHandler = require('../middleware/asyncHandler');
const { rateLimit, requireAdmin } = require('../middleware/security');

const apiLimiter = rateLimit({ windowMs: 60 * 1000, max: 120, prefix: 'api' });
const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, prefix: 'api-contact' });

router.use(apiLimiter);
router.get('/health', asyncHandler(controller.health));
router.get('/projects', asyncHandler(controller.listProjects));
router.get('/projects/:slug', asyncHandler(controller.getProject));
router.post('/contact', contactLimiter, asyncHandler(controller.createContact));
router.post('/admin/projects', requireAdmin, asyncHandler(controller.createProject));
router.patch('/admin/projects/:id', requireAdmin, asyncHandler(controller.updateProject));
router.delete('/admin/projects/:id', requireAdmin, asyncHandler(controller.deleteProject));

router.use((req, res) => res.status(404).json({
  error: { code: 'NOT_FOUND', message: 'Endpoint API tidak ditemukan.' }
}));

module.exports = router;
