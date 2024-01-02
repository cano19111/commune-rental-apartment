const mongoose = require('mongoose');

const COLLECTION = 'apartments';
const DOCUMENT = 'Apartment';

const apartmentsSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        location: {
            longitude: { type: Number, require: true },
            latitude: { type: Number, require: true },
            province: { type: String, require: true },
            district: { type: String, require: true },
            ward: { type: String },
            street: { type: String, require: true },
        },
        createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
        rooms: [
            {
                services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', require: true }],
                description: { type: String, require: true },
                size: { type: Number, require: true },
                price: { type: Number, require: true },
                images: [{ type: String, require: true }],
                unavailableDateRanges: [{ startDay: { type: Date }, endDay: { type: Date } }],
                roomType: { type: String, require: true },
                numberOfGuest: { type: Number, require: true },
                reviews: [
                    {
                        score: { type: Number },
                        comment: { type: String },
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
apartmentsSchema.index({
    'location.province': 'text',
    'location.district': 'text',
    'location.ward': 'text',
    'location.street': 'text',
});
module.exports = mongoose.model(DOCUMENT, apartmentsSchema, COLLECTION);
