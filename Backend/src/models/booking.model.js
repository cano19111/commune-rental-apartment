const mongoose = require('mongoose');

const COLLECTION = 'bookings';
const DOCUMENT = 'Booking';

const userSchema = new mongoose.Schema(
    {
        email: { type: String, require: true },
        firstname: { type: String, require: true },
        lastname: { type: String, require: true },
        phone: { type: String, require: true },
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Apartment.rooms',
        },
        arrivalTime: { type: String, require: true },
        checkInTime: { type: Date, require: true },
        checkOutTime: { type: Date, require: true },
        totalPrice: { type: Number, require: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model(DOCUMENT, userSchema, COLLECTION);
