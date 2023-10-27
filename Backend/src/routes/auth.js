const router = require('express').Router();
const controller = require('../controllers/auth.controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/logout', controller.logout);
router.post('/refresh-token', controller.refreshAccessToken);

module.exports = router;
