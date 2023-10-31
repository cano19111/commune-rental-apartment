const imageRouter = require('express').Router();
const upload = require('../middlewares/uploadFile');
const controller = require('../controllers/image.controller');
const { verifyAccessToken } = require('../middlewares/verifyToken');

imageRouter.post('/', verifyAccessToken, upload.single('image'), controller.uploadImage);
imageRouter.post('/multiple', verifyAccessToken, upload.array('image', 10), controller.uploadMultipleFiles);
imageRouter.get('/:filename', controller.openImageBrowser);
imageRouter.delete('/:id', verifyAccessToken, controller.deleteFileByFileName);

module.exports = imageRouter;
