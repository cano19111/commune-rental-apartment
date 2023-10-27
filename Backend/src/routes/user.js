const router = require('express').Router();
const controller = require('../controllers/user.controller');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.get('/current-user', verifyAccessToken, controller.getCurrentUser);

module.exports = router;
