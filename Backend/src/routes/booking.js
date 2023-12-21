const router = require('express').Router();
const controller = require('../controllers/booking.controller');

router.post('/', controller.createBooking);

module.exports = router;
