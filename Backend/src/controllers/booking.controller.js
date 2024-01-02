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

    res.status(201).json({ success: true, message: 'Booking successfully created', data: { booking: newBooking } });
};

const getBookings = async (req, res, next) => {
    function delay(milliseconds) {
        return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });
    }
    await delay(1000);
    try {
        const [err, bookings] = await to(Booking.find({}));
        if (err) {
            return res.status(500).json({ success: false, message: 'Error finding booking' });
        }
        const bookingDetails = await Promise.all(
            bookings.map(async (booking) => {
                const apartment = await Apartment.findOne({ 'rooms._id': booking.room });

                const room = apartment.rooms.id(booking.room);

                return {
                    _id: booking._id,
                    name: apartment.title,
                    image: `${process.env.SERVER_URI}/api/image/${room.images[0]}`,
                    checkIn: booking.checkInTime,
                    checkOut: booking.checkOutTime,
                    totalPrice: booking.totalPrice,
                };
            }),
        );

        res.status(200).json({
            success: true,
            data: {
                bookings: bookingDetails,
            },
        });
    } catch (error) {
        next(error);
    }
};
const getBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const [err, booking] = await to(Booking.findById(bookingId));
        if (err) {
            return res.status(500).json({ success: false, message: 'Error finding booking' });
        }

        const apartment = await Apartment.findOne({ 'rooms._id': booking.room }).populate({
            path: 'createBy',
            select: 'phone email',
        });
        if (!apartment) {
            return res.status(404).json({ success: false, message: 'Apartment not found' });
        }
        const room = apartment.rooms.id(booking.room);

        const bookingDetails = {
            _id: booking._id,
            name: apartment.title,
            address: booking.location,
            image: `${process.env.SERVER_URI}/api/image/${room.images[0]}`,
            checkIn: booking.checkInTime,
            checkOut: booking.checkOutTime,
            totalPrice: booking.totalPrice,
            roomType: room.roomType,
            contact: apartment.createBy,
        };

        res.status(200).json({
            success: true,
            data: {
                booking: bookingDetails,
            },
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    createBooking,
    getBookings,
    getBooking,
};
