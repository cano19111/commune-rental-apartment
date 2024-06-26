const User = require('../models/user.model');
const { default: to } = require('await-to-js');
const mongoose = require('mongoose');
const Apartment = require('../models/apartment.model');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getAllApartment = async (req, res, next) => {
    try {
        const [err, apartment] = await to(
            Apartment.find({})
                .populate({
                    path: 'rooms.services',
                })
                .populate({
                    path: 'createBy',
                })
                .exec(),
        );

        
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error getting apartment',
            });
        }

        if (!apartment) {
            return res.status(404).json({
                success: false,
                message: 'Apartment not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Apartment getting successfully',
            data: {
                apartment,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getApartment = async (req, res, next) => {
    try {
        const { apartmentId } = req.params;
        const { start_date, end_date, number_of_guest, room_number, min_price, max_price } = req.query;

        const startDay = new Date(start_date);
        const endDay = new Date(end_date);
        const today = new Date(Date.now()).setHours(0, 0, 0, 0);

        if (startDay < today || endDay < today) {
            return res.status(400).json({
                success: false,
                message: 'Invalid start or end date',
            });
        }

        const numberOfGuest = parseInt(number_of_guest, 10) || 1;
        const roomNumber = parseInt(room_number, 10) || 1;
        const minPrice = parseInt(min_price, 10) || 0;
        const maxPrice = parseInt(max_price, 10) || 1000000000;

        const [err, apartment] = await to(
            Apartment.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(apartmentId) } },
                { $unwind: '$rooms' },
                {
                    $match: {
                        'rooms.numberOfGuest': { $gte: numberOfGuest },
                        'rooms.quantity': { $gte: roomNumber },
                        $or: [
                            { 'rooms.unavailableDateRanges': null },
                            {
                                'rooms.unavailableDateRanges': {
                                    $not: {
                                        $elemMatch: {
                                            startDay: { $lt: endDay },
                                            endDay: { $gt: startDay },
                                        },
                                    },
                                },
                            },
                        ],
                        'rooms.price': { $gte: minPrice, $lte: maxPrice },
                    },
                },
                {
                    $lookup: {
                        from: 'services',
                        localField: 'rooms.services',
                        foreignField: '_id',
                        as: 'rooms.services',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'createBy',
                        foreignField: '_id',
                        as: 'createBy',
                    },
                },
                {
                    $unwind: '$createBy',
                },
                {
                    $group: {
                        _id: '$_id',
                        title: { $first: '$title' },
                        location: { $first: '$location' },
                        createBy: { $first: '$createBy' },
                        rooms: {
                            $push: {
                                $mergeObjects: [
                                    '$rooms',
                                    {
                                        services: {
                                            $map: {
                                                input: '$rooms.services',
                                                as: 'service',
                                                in: {
                                                    title: '$$service.title',
                                                    image: '$$service.image',
                                                },
                                            },
                                        },
                                        images: {
                                            $map: {
                                                input: '$rooms.images',
                                                as: 'image',
                                                in: {
                                                    $concat: [`${process.env.SERVER_URI}/api/image/`, '$$image'],
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },

                {
                    $project: {
                        _id: 1,
                        title: 1,
                        location: 1,
                        'createBy._id': 1,
                        'createBy.firstname': 1,
                        'createBy.lastname': 1,
                        'createBy.avatar': 1,
                        rooms: 1,
                    },
                },
                { $limit: 1 },
            ]).exec(),
        );

        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error retrieving apartment',
            });
        }

        if (!apartment || !apartment[0]) {
            return res.status(404).json({
                success: false,
                message: 'Apartment not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Apartment retrieved successfully',
            data: {
                apartment: apartment[0],
            },
        });
    } catch (error) {
        next(error);
    }
};

const createApartment = async (req, res, next) => {
    try {
        const { title, rooms, location } = req.body;
        const { _id: createBy } = req.user;
        const roomsInApartment = rooms.map((room, index) => {
            const fieldName = `rooms[${index}][images]`;

            const roomImages = req.files.filter((image) => image.fieldname === fieldName) || [];

            const images = roomImages.map((file) => file?.filename);

            return {
                ...room,
                images,
                services: room.services.map((service) => new mongoose.Types.ObjectId(service)),
            };
        });

        let newApartment;
        let err;

        [err, newApartment] = await to(
            Apartment.create({
                title,
                createBy,
                location,
                rooms: roomsInApartment,
            }),
        );

        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error creating apartment',
            });
        }

        let updateUser;

        [err, updateUser] = await to(
            User.findByIdAndUpdate(
                createBy,
                {
                    $push: { createApartments: newApartment._id },
                },
                { new: true },
            ),
        );
        const response = await newApartment.populate({
            path: 'rooms.services',
        });
        if (updateUser) {
            return res.status(200).json({
                success: true,
                message: 'Apartment created successfully',
                data: {
                    response,
                },
            });
        }
    } catch (error) {
        next(error);
    }
};

const searchApartments = async (req, res, next) => {
    try {
        const {
            number_of_guest,
            room_number,
            province,
            district,
            ward,
            street,
            start_date,
            end_date,
            name,
            min_price,
            max_price,
        } = req.query;
        const parsedStartDay = new Date(start_date);
        const parsedEndDay = new Date(end_date);
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const minPrice = parseInt(min_price, 10) || 0;
        const maxPrice = parseInt(max_price, 10) || 1000000000;
        const skip = (page - 1) * limit;
        const today = new Date(Date.now()).setHours(0, 0, 0, 0);
        if (parsedStartDay < today || parsedEndDay < today) {
            return res.status(400).json({
                success: false,
                message: 'The start date or end date cannot be earlier than the current date',
            });
        }

        const parsedNumberOfGuest = parseInt(number_of_guest, 10) || 1;
        const parsedQuantity = parseInt(room_number, 10) || 1;
        const textSearchString = `${province} ${district} ${ward} ${street} ${name}`;

        const initialMatch = {
            $match: {
                $text: { $search: textSearchString },
            },
        };

        const query = {
            'rooms.numberOfGuest': { $gte: parsedNumberOfGuest },
            'rooms.quantity': { $gte: parsedQuantity },
            'rooms.unavailableDateRanges': {
                $not: {
                    $elemMatch: {
                        startDay: { $lte: parsedEndDay },
                        endDay: { $gte: parsedStartDay },
                    },
                },
            },
            'rooms.price': { $gte: minPrice, $lte: maxPrice },
        };

        const [error, aggregateResult] = await to(
            Apartment.aggregate([
                initialMatch,
                {
                    $facet: {
                        paginatedResult: [
                            { $unwind: '$rooms' },
                            { $match: query },
                            {
                                $lookup: {
                                    from: 'services',
                                    localField: 'rooms.services',
                                    foreignField: '_id',
                                    as: 'rooms.services',
                                },
                            },
                            {
                                $group: {
                                    _id: '$_id',
                                    roomPriceMin: {
                                        $min: '$rooms.price',
                                    },
                                    roomId: { $first: '$rooms._id' },
                                    title: { $first: '$title' },
                                    location: { $first: '$location' },
                                    numberOfGuest: { $first: '$rooms.numberOfGuest' },
                                    quantity: { $first: '$rooms.quantity' },
                                    reviews: { $first: '$rooms.reviews' },
                                    images: { $first: '$rooms.images' },
                                    services: { $first: '$rooms.services' },
                                },
                            },
                            {
                                $project: {
                                    _id: 1,
                                    roomId: '$roomId',
                                    name: '$title',
                                    address: {
                                        street: '$location.street',
                                        ward: '$location.ward',
                                        district: '$location.district',
                                        province: '$location.province',
                                    },
                                    image: {
                                        $concat: [
                                            `${process.env.SERVER_URI}/api/image/`,
                                            { $arrayElemAt: [{ $ifNull: ['$images', []] }, 0] },
                                        ],
                                    },
                                    price: '$roomPriceMin',
                                    numberOfGuest: '$numberOfGuest',
                                    quantity: '$quantity',
                                    services: {
                                        $slice: ['$services.title', 3],
                                    },

                                    rating: {
                                        ratingAgv: {
                                            $cond: {
                                                if: { $gt: [{ $size: { $ifNull: ['$reviews', []] } }, 0] },
                                                then: {
                                                    $avg: '$reviews.score',
                                                },
                                                else: 0,
                                            },
                                        },
                                        totalRating: { $sum: { $ifNull: ['$reviews.score', 0] } },
                                    },
                                },
                            },
                            { $skip: skip },
                            { $limit: limit },
                        ],
                        totalCount: [
                            { $unwind: '$rooms' },
                            { $match: query },
                            {
                                $group: {
                                    _id: '$_id',
                                    roomPriceMin: {
                                        $min: '$rooms.price',
                                    },
                                },
                            },
                            { $count: 'totalCount' },
                        ],
                    },
                },
            ]),
        );

        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Error searching apartments',
            });
        }

        const { paginatedResult, totalCount } = aggregateResult[0];
        const totalResults = totalCount && totalCount.length > 0 ? totalCount[0].totalCount : 0;

        return res.status(200).json({
            success: true,
            message: 'Search apartments successfully',
            data: {
                page,
                pageResults: paginatedResult.length,
                totalResults,
                apartments: paginatedResult,
            },
        });
    } catch (error) {
        next(error);
    }
};

const updateApartment = async (req, res, next) => {
    try {
        const { apartmentId } = req.params;
        const { title, rooms } = req.body;
        const { _id: updatedBy } = req.user;

        const roomsInApartment = rooms.map((room) => {
            return {
                ...room,
                services: room.services.map((service) => new mongoose.Types.ObjectId(service)),
            };
        });

        let updatedApartment;
        let err;

        [err, updatedApartment] = await to(
            Apartment.findByIdAndUpdate(
                apartmentId,
                {
                    title,
                    updatedBy,
                    rooms: roomsInApartment,
                    updatedAt: new Date(),
                },
                { new: true },
            ),
        );

        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error updating apartment',
            });
        }

        if (!updatedApartment) {
            return res.status(404).json({
                success: false,
                message: 'Apartment not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Apartment updated successfully',
            data: {
                updatedApartment,
            },
        });
    } catch (error) {
        next(error);
    }
};

const deleteApartment = async (req, res, next) => {
    try {
        const { apartmentId } = req.params;
        const { _id: deletedBy } = req.user;

        let err, deletedApartment;

        [err, deletedApartment] = await to(
            Apartment.findOneAndDelete({
                _id: apartmentId,
                createdBy: deletedBy,
            }),
        );

        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error deleting apartment',
            });
        }

        if (!deletedApartment) {
            return res.status(404).json({
                success: false,
                message: 'Apartment not found or you do not have permission to delete it',
            });
        }

        [err] = await to(
            User.findByIdAndUpdate(deletedBy, {
                $pull: { createdApartments: deletedApartment._id },
            }),
        );

        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error updating user',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Apartment deleted successfully',
            data: {
                deletedApartment,
            },
        });
    } catch (error) {
        next(error);
    }
};

const removeRoomFromApartment = async (req, res, next) => {
    try {
        const { apartmentId, roomId } = req.params;
        const { _id: removedBy } = req.user;

        let err, updatedApartment;
        [err, updatedApartment] = await to(
            Apartment.findByIdAndUpdate(
                apartmentId,
                {
                    $pull: { rooms: { _id: roomId } },
                    updatedBy: removedBy,
                    updatedAt: new Date(),
                },
                { new: true },
            ),
        );

        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error removing room from apartment',
            });
        }

        if (!updatedApartment) {
            return res.status(404).json({
                success: false,
                message: 'Apartment not found or you do not have permission to remove a room',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Room removed from apartment successfully',
            data: {
                updatedApartment,
            },
        });
    } catch (error) {
        next(error);
    }
};

const findRoomById = async (req, res) => {
    const room_id = req.params.roomId;
    const { start_date, end_date, room_number } = req.query;

    const roomIdObj = new mongoose.Types.ObjectId(room_id);

    const startDay = new Date(start_date);
    const endDay = new Date(end_date);

    if (isNaN(startDay.getTime()) || isNaN(endDay.getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid start or end date' });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (startDay < today || endDay < today) {
        return res.status(400).json({
            success: false,
            message: 'The start date or end date cannot be earlier than the current date',
        });
    }

    const pipeline = [
        { $match: { 'rooms._id': roomIdObj } },
        { $unwind: '$rooms' },
        { $match: { 'rooms._id': roomIdObj } },
        {
            $match: {
                $or: [
                    {
                        'rooms.unavailableDateRanges': {
                            $not: {
                                $elemMatch: { startDay: { $lte: startDay }, endDay: { $gte: endDay } },
                            },
                        },
                    },
                    { 'rooms.unavailableDateRanges': { $exists: false } },
                ],
            },
        },
        { $match: { 'rooms.quantity': { $gte: parseInt(room_number, 10) || 1 } } },
        {
            $lookup: {
                from: 'services',
                localField: 'rooms.services',
                foreignField: '_id',
                as: 'rooms.services',
            },
        },
        {
            $project: {
                _id: 0,
                title: 1,
                location: 1,
                room: {
                    _id: '$rooms._id',
                    price: '$rooms.price',
                    size: '$rooms.size',
                    roomType: '$rooms.roomType',
                    numberOfGuest: '$rooms.numberOfGuest',
                    quantity: '$rooms.quantity',
                    reviews: '$rooms.reviews',
                    services: {
                        $slice: [
                            {
                                $map: {
                                    input: '$rooms.services',
                                    as: 'service',
                                    in: {
                                        title: '$$service.title',
                                        image: '$$service.image',
                                    },
                                },
                            },
                            4,
                        ],
                    },
                },
            },
        },
        { $limit: 1 },
    ];

    try {
        const result = await Apartment.aggregate(pipeline).exec();

        if (!result || result.length === 0) {
            return res.status(404).json({ success: false, message: 'Room not found or unavailable' });
        }
        const { title, location, room } = result[0];
        return res.json({
            success: true,
            data: {
                title,
                location,
                ...room,
            },
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const createStripePayment = async (req, res, next) => {
    const { amount, description, source } = req.body;
    const [err, paymentIntent] = await to(
        stripe.paymentIntents.create({
            amount: amount,
            currency: 'VND',
            description: description,
            source: source,
            automatic_payment_methods: { enabled: true },
        }),
    );

    if (err) {
        return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
};

const getApartmentsByUserId = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const [err, apartments] = await to(
            Apartment.find({ createBy: userId }).select('title location rooms.images rooms.price').lean(),
        );

        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        if (!apartments || apartments.length === 0) {
            return res.status(404).json({ success: false, message: 'No apartments found for this user.' });
        }

        const formattedApartments = apartments.map((apartment) => ({
            title: apartment.title,
            location: apartment.location,
            image:
                apartment.rooms.length > 0
                    ? `${process.env.SERVER_URI}/api/image/${apartment.rooms[0].images[0]}`
                    : undefined,
            price: apartment.rooms.length > 0 ? apartment.rooms[0].price : undefined,
        }));

        res.status(200).json({
            success: true,
            data: {
                apartments: formattedApartments,
            },
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    createApartment,
    updateApartment,
    deleteApartment,
    removeRoomFromApartment,
    getApartment,
    getAllApartment,
    searchApartments,
    createStripePayment,
    findRoomById,
    getApartmentsByUserId,
};
