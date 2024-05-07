const router = require('express').Router();
const controller = require('../controllers/booking.controller');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.get('/:bookingId', verifyAccessToken, controller.getBooking);
router.get('/', verifyAccessToken, controller.getBookings);
router.post('/', controller.createBooking);

module.exports = router;
