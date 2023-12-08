const User = require('../models/user.model');
const { default: to } = require('await-to-js');
const mongoose = require('mongoose');
const Apartment = require('../models/apartment.model');

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

        const [err, apartment] = await to(
            Apartment.findById(apartmentId)
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
                message: 'Error retrieving apartment',
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
            message: 'Apartment retrieved successfully',
            data: {
                apartment,
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
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await delay(1000);
    try {
        const { numberOfGuest, quantity, province, district, ward, street, startDate, endDate, name } = req.query;
        const parsedStartDay = new Date(startDate);
        const parsedEndDay = new Date(endDate);
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const minPrice = parseInt(req.query.minPrice, 10) || 0;
        const maxPrice = parseInt(req.query.maxPrice, 10) || 1000000000;
        const skip = (page - 1) * limit;
        const nowDate = new Date(Date.now()).setHours(0, 0, 0, 0);
        if (parsedStartDay < nowDate || parsedEndDay < nowDate) {
            return res.status(400).json({
                success: false,
                message: 'The start date or end date cannot be earlier than the current date',
            });
        }

        const parsedNumberOfGuest = parseInt(numberOfGuest, 10) || 1;
        const parsedQuantity = parseInt(quantity, 10) || 1;
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

module.exports = {
    createApartment,
    updateApartment,
    deleteApartment,
    removeRoomFromApartment,
    getApartment,
    getAllApartment,
    searchApartments,
};
