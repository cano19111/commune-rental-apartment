const mongoose = require('mongoose');

const COLLECTION = 'users';
const DOCUMENT = 'User';

const userSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        firstname: { type: String },
        lastname: { type: String },
        password: { type: String },
        avatar: {
            type: String,
            default: '30b64d2bf8fe39eb2576e10c939b6689.png',
        },
        phone: {
            type: String,
        },
        dateOfBirth: {
            type: Date,
        },
        nationality: {
            type: String,
        },
        gender: {
            type: String,
        },
        personalId: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        address: {
            type: String,
        },
        aboutMe: {
            type: String,
        },
        favorites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Apartment',
            },
        ],
        createApartments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Apartment',
            },
        ],
        confirmationToken: { type: String },
        emailConfirmed: { type: Boolean, default: false },
        refreshToken: {
            type: String,
        },
        provider: {
            type: String,
            enum: ['Email', 'Google', 'Facebook'],
            default: 'Email',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model(DOCUMENT, userSchema, COLLECTION);
