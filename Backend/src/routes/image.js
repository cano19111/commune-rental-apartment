const imageRouter = require('express').Router();
const upload = require('../middlewares/uploadFile');
const controller = require('../controllers/image.controller');
const { verifyAccessToken } = require('../middlewares/verifyToken');

