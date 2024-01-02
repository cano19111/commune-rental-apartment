const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/auth.controller');
const { validateRequest } = require('../middlewares/validation');
const { userSignUpSchema, userLoginSchema } = require('../utils/validation');
router.post('/register', validateRequest(userSignUpSchema), controller.register);
router.post('/login', validateRequest(userLoginSchema), controller.login);
router.get('/logout', controller.logout);
router.post('/refresh-token', controller.refreshAccessToken);
router.get('/confirm-email', controller.confirmEmail);
router.post('/set-password', controller.setPassword);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get(
    '/google/callback',
    (req, res, next) => {
        passport.authenticate('google', (err, profile) => {
            req.user = profile;
            next();
        })(req, res, next);
    },
    (req, res) => {
        res.redirect(`${process.env.CLIENT_URI}/signin-success/${req.user?._id}`);
    },
);

router.get('/facebook', passport.authenticate('facebook', { session: false, scope: ['email'] }));
router.get(
    '/facebook/callback',
    (req, res, next) => {
        passport.authenticate('facebook', (err, profile) => {
            req.user = profile;
            next();
        })(req, res, next);
    },
    (req, res) => {
        res.redirect(`${process.env.CLIENT_URI}/signin-success/${req.user?.id}`);
    },
);
router.get('/signin-success/:userId', controller.googleLoginSuccess);
module.exports = router;
