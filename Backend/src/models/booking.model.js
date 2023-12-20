const mongoose = require('mongoose');

const COLLECTION = 'bookings';
const DOCUMENT = 'Booking';

const userSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        firstname: { type: String },
        lastname: { type: String },
        apartments: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Apartment.rooms',
        },
        checkInTime: { type: Date, require: true },
        checkOutTime: { type: Date, require: true },
        totalPrice: { type: Number, require: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model(DOCUMENT, userSchema, COLLECTION);
