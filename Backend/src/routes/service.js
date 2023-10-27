const router = require('express').Router();
const controller = require('../controllers/service.controller');
const { validateRequest } = require('../middlewares/validation');
const { verifyAccessToken, verifyIsAdmin } = require('../middlewares/verifyToken');
const { serviceSchema } = require('../utils/validation');

router.post('/', [verifyAccessToken, verifyIsAdmin], validateRequest(serviceSchema), controller.createService);
router.put('/:sid', [verifyAccessToken, verifyIsAdmin], validateRequest(serviceSchema), controller.updateService);
router.delete('/:sid', [verifyAccessToken, verifyIsAdmin], controller.deleteService);

module.exports = router;
