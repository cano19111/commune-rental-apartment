const mongoose = require('mongoose');

const COLLECTION = 'services';
const DOCUMENT = 'Service';

const serviceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, default: '' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model(DOCUMENT, serviceSchema, COLLECTION);
