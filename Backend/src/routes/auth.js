const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const { validateRequest } = require('../middlewares/validation');
const { userSignUpSchema, userLoginSchema } = require('../utils/validation');
router.post('/register', validateRequest(userSignUpSchema), controller.register);
router.post('/login', validateRequest(userLoginSchema), controller.login);
router.get('/logout', controller.logout);
router.post('/refresh-token', controller.refreshAccessToken);
router.get('/confirm-email', controller.confirmEmail);
router.post('/set-password', controller.setPassword);

module.exports = router;
