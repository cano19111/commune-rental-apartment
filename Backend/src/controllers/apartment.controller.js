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
    try {
        const { numberOfGuest, quantity, province, district, ward, street, startDate, endDate, name } = req.query;
        const parsedStartDay = new Date(startDate);
        const parsedEndDay = new Date(endDate);

        if (parsedStartDay < new Date() || parsedEndDay < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'The start date or end date cannot be earlier than the current date',
            });
        }

        const parsedNumberOfGuest = parseInt(numberOfGuest, 10) || 1;
        const parsedQuantity = parseInt(quantity, 10) || 1;
        const textSearchString = `${province} ${district} ${ward} ${street} ${name}`;

        const aggregateOptions = [
            {
                $match: {
                    $text: { $search: textSearchString },
                },
            },
            {
                $unwind: '$rooms',
            },
            {
                $match: {
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
                },
            },
            {
                $count: 'totalResults',
            },
        ];

        const [countError, countResult] = await to(Apartment.aggregate(aggregateOptions));

        if (countError) {
            console.log(countError);
            return res.status(500).json({
                success: false,
                message: 'Error counting total results',
            });
        }

        const totalResults = countResult.length > 0 ? countResult[0].totalResults : 0;

        const finalAggregateOptions = [
            ...aggregateOptions.slice(0, aggregateOptions.length - 1),
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
                    _id: '$_id',
                    name: '$title',
                    address: {
                        street: '$location.street',
                        ward: '$location.ward',
                        district: '$location.district',
                        province: '$location.province',
                    },
                    image: {
                        $concat: [`${process.env.SERVER_URI}/api/image/`, { $arrayElemAt: ['$rooms.images', 0] }],
                    },
                    price: '$rooms.price',
                    numberOfGuest: '$rooms.numberOfGuest',
                    quantity: '$rooms.quantity',
                    services: {
                        $slice: ['$rooms.services.title', 3],
                    },
                    rating: {
                        $cond: {
                            if: { $gt: [{ $size: '$rooms.reviews' }, 0] },
                            then: {
                                $avg: '$rooms.reviews.score',
                            },
                            else: 0,
                        },
                    },
                },
            },
        ];

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        finalAggregateOptions.push({ $skip: skip }, { $limit: limit });

        const [error, result] = await to(Apartment.aggregate(finalAggregateOptions));

        if (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error searching apartments',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Search apartments successfully',
            data: {
                page,
                countPage: result.length,
                totalResults,
                apartments: result,
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
