const router = require('express').Router();
const controller = require('../controllers/apartment.controller');
const { validateRequest } = require('../middlewares/validation');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const { apartmentSchema } = require('../utils/validation');
const upload = require('../middlewares/uploadFile');

router.post('/', verifyAccessToken, upload.any(), validateRequest(apartmentSchema, true), controller.createApartment);
router.get('/search', controller.searchApartments);
router.get('/room/:roomId', controller.findRoomById);
router.get('/by-user', verifyAccessToken, controller.getApartmentsByUserId);
router.get('/', verifyAccessToken, controller.getAllApartment);
router.get('/:apartmentId', controller.getApartment);
router.put('/:apartmentId', verifyAccessToken, validateRequest(apartmentSchema), controller.updateApartment);
router.delete('/:apartmentId', verifyAccessToken, controller.deleteApartment);
router.delete('/room/:roomId', verifyAccessToken, controller.removeRoomFromApartment);
router.post('/create-stripe-payment', controller.createStripePayment);

module.exports = router;
