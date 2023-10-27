const mongoose = require('mongoose');

const COLLECTION = 'services';
const DOCUMENT = 'Service';

const userSchema = new mongoose.Schema(
    {
        title: { type: String, require: true, unique: true },
        quantity: { type: Number, require: true },
        description: { type: String, default: '' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model(DOCUMENT, userSchema, COLLECTION);
