const router = require('express').Router();
const controller = require('../controllers/user.controller');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploadFile');

router.get('/current-user', verifyAccessToken, controller.getCurrentUser);
router.put('/', verifyAccessToken, upload.single('avatar'), controller.editUser);

module.exports = router;
