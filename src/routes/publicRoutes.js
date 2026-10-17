const router = require('express').Router();
const controller = require('../controllers/publicController');
const asyncHandler = require('../middleware/asyncHandler');
const { rateLimit } = require('../middleware/security');

const contactLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, prefix: 'contact' });

router.get('/', asyncHandler(controller.home));
router.get('/done-deal', asyncHandler(controller.doneDeal));
router.get('/proyek/:slug', asyncHandler(controller.projectDetail));
router.get('/tentang', controller.about);
router.get('/kontak', controller.contactForm);
router.post('/kontak', contactLimiter, asyncHandler(controller.submitContact));

module.exports = router;
