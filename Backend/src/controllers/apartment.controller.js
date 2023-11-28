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

            const images = roomImages.map((file) => `${process.env.SERVER_URI}/api/image/${file?.filename}`);

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
const searchRooms = async (req, res, next) => {
    try {
        const { numberOfGuest, quantity, province, district, ward, street } = req.query;
        const parsedNumberOfGuest = parseInt(numberOfGuest, 10) || 1;
        const parsedQuantity = parseInt(quantity, 10) || 1;

        const aggregateOptions = [
            {
                $match: {
                    'rooms.numberOfGuest': { $gte: parsedNumberOfGuest || 1 },
                    'rooms.quantity': { $gte: parsedQuantity || 1 },
                    'location.province': new RegExp(province, 'i'),
                    'location.district': new RegExp(district, 'i'),
                    'location.ward': new RegExp(ward, 'i'),
                    'location.street': new RegExp(street, 'i'),
                },
            },
            {
                $project: {
                    rooms: {
                        $filter: {
                            input: '$rooms',
                            as: 'room',
                            cond: {
                                $and: [
                                    { $gte: ['$$room.numberOfGuest', parsedNumberOfGuest || 1] },
                                    { $gte: ['$$room.quantity', parsedQuantity || 1] },
                                ],
                            },
                        },
                    },
                    title: 1,
                    location: {
                        street: 1,
                        ward: 1,
                        district: 1,
                        province: 1,
                    },
                },
            },
            {
                $unwind: '$rooms',
            },
            {
                $project: {
                    _id: '$rooms._id',
                    name: '$title',
                    address: {
                        street: '$location.street',
                        ward: '$location.ward',
                        district: '$location.district',
                        province: '$location.province',
                    },
                    image: { $arrayElemAt: ['$rooms.images', 0] },
                    price: '$rooms.price',
                    numberOfGuest: '$rooms.numberOfGuest',
                    quantity: '$rooms.quantity',
                    rating: {
                        $cond: {
                            if: { $gt: [{ $size: '$rooms.reviews' }, 0] },
                            then: {
                                $avg: '$rooms.reviews.star',
                            },
                            else: 0,
                        },
                    },
                },
            },
        ];

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;
        const skip = (page - 1) * limit;

        aggregateOptions.push({ $skip: skip }, { $limit: limit });

        const [error, result] = await to(Apartment.aggregate(aggregateOptions));

        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Error searching rooms',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Search rooms successfully',
            data: {
                page,
                count: result.length,
                rooms: result,
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
    searchRooms,
};
