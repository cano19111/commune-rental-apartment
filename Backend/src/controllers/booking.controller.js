const fs = require('fs').promises;
const mongoose = require('mongoose');
const Booking = require('../models/booking.model');
const Apartment = require('../models/apartment.model');
const { sendMail } = require('../utils/helpers');
const to = require('await-to-js').default;

const createBooking = async (req, res) => {
    const { email, firstname, lastname, roomId, checkInTime, checkOutTime, totalPrice, arrivalTime, phone } = req.body;

    if (!email || !roomId || !checkInTime || !checkOutTime || !totalPrice) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const [findError, apartment] = await to(Apartment.findOne({ 'rooms._id': new mongoose.Types.ObjectId(roomId) }));

    if (findError) {
        return res.status(500).json({ success: false, message: 'Error finding room', error: findError.message });
    }

    if (!apartment) {
        return res.status(404).json({ success: false, message: 'Room not found' });
    }

    const room = apartment.rooms.id(roomId);
    room.unavailableDateRanges.push({ startDay: checkInTime, endDay: checkOutTime });

    let [updateError] = await to(apartment.save());
    if (updateError) {
        return res
            .status(500)
            .json({ success: false, message: 'Error updating room availability', error: updateError.message });
    }

    const newBooking = new Booking({
        email,
        firstname,
        lastname,
        room: roomId,
        phone,
        arrivalTime,
        checkInTime,
        checkOutTime,
        totalPrice,
    });

    let [saveError] = await to(newBooking.save());
    if (saveError) {
        return res.status(500).json({ success: false, message: 'Error saving booking', error: saveError.message });
    }

    const [readError, htmlTemplate] = await to(fs.readFile('src/template/bookingConfirmationTemplate.html', 'utf-8'));
    if (readError) {
        return res
            .status(500)
            .json({ success: false, message: 'Error reading email template', error: readError.message });
    }

    let htmlToSend = htmlTemplate
        .replace('{{firstname}}', firstname)
        .replace('{{lastname}}', lastname)
        .replace('{{bookingId}}', newBooking._id.toString())
        .replace('{{checkInTime}}', checkInTime.toString())
        .replace('{{checkOutTime}}', checkOutTime.toString())
        .replace('{{totalPrice}}', `${totalPrice.toLocaleString()} VND`);

    let [mailError] = await to(sendMail({ email, html: htmlToSend, subject: 'Booking Confirmation' }));
    if (mailError) {
        return res.status(500).json({ success: false, message: 'Error sending email', error: mailError.message });
    }

    res.status(201).json({ success: true, message: 'Booking successfully created', booking: newBooking });
};

module.exports = {
    createBooking,
};
