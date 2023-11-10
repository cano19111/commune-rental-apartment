const mongoose = require('mongoose');

const COLLECTION = 'apartments';
const DOCUMENT = 'Apartment';

const userSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        location: {
            longitude: { type: Number, require: true },
            latitude: { type: Number, require: true },
            province: { type: String, require: true },
            district: { type: String, require: true },
            ward: { type: String },
        },
        createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
        rooms: [
            {
                services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', require: true }],
                description: { type: String, require: true },
                size: { type: Number, require: true },
                price: { type: Number, require: true },
                images: [{ type: String, require: true }],
                availability: { type: Boolean, require: true, default: true },
                roomType: { type: String, require: true },
                numberOfGuest: { type: Number, require: true },
                reviews: [
                    {
                        star: { type: Number },
                        comment: { type: Number },
                        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                    },
                ],
                quantity: { type: Number, require: true },
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model(DOCUMENT, userSchema, COLLECTION);
