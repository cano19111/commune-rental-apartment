const mongoose = require('mongoose');

const COLLECTION = 'apartments';
const DOCUMENT = 'Apartment';

const userSchema = new mongoose.Schema(
    {
        title: { type: String },
        // location: {
        //     coordinate: { type: String, },
        //     province: { type: String, },
        //     district: { type: String, },
        //     street: { type: String, },
        // },
        createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rooms: [
            {
                services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
                description: { type: String },
                size: { type: Number },
                price: { type: Number },
                image: [{ type: String }],
                availability: { type: Boolean },
                roomType: { type: String },
                numberOfGuest: { type: Number },
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
