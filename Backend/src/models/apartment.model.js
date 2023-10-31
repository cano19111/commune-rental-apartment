const mongoose = require('mongoose');

const COLLECTION = 'apartments';
const DOCUMENT = 'Apartment';

const userSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        location: {
            coordinate: { type: String },
            province: { type: String },
            district: { type: String },
            street: { type: String },
        },
        createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
        rooms: [
            {
                services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', require: true }],
                description: { type: String, require: true },
                size: { type: Number, require: true },
                price: { type: Number, require: true },
                image: [{ type: String, require: true }],
                availability: { type: Boolean, require: true },
                roomType: { type: String, require: true },
                numberOfGuest: { type: Number, require: true },
                reviews: [
                    {
                        star: { type: Number },
                        comment: { type: Number },
                        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model(DOCUMENT, userSchema, COLLECTION);
