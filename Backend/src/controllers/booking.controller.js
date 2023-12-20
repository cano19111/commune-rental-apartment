const bcrypt = require('bcrypt');
const to = require('await-to-js').default;
const Booking = require('../models/booking.model');

const createBooking = async (req, res) => {
    const { email, firstname, lastname, apartmentId, checkInTime, checkOutTime, totalPrice } = req.body;

    if (!email || !apartmentId || !checkInTime || !checkOutTime || !totalPrice) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const newBooking = new Booking({
            email,
            firstname,
            lastname,
            apartments: apartmentId,
            checkInTime,
            checkOutTime,
            totalPrice,
        });

        await newBooking.save();
        res.status(201).json({ success: true, message: 'Booking successfully created', booking: newBooking });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = {
    createBooking,
};
