const to = require('await-to-js').default;
const Service = require('../models/service.model');

const createService = async (req, res, next) => {
    const { title, description } = req.body;

    try {
        const [errExistingService, existingService] = await to(Service.findOne({ title }));

        if (errExistingService) {
            return res.status(500).json({
                status: 'error',
                message: 'Error finding service',
            });
        }

        if (existingService) {
            return res.status(400).json({
                status: 'error',
                message: 'Service with the same title already exists',
            });
        }

        const [errCreateService, newService] = await to(
            Service.create({
                title,
                description,
            }),
        );

        if (errCreateService) {
            return res.status(500).json({
                status: 'error',
                message: 'Error creating service',
            });
        }

        return res.status(201).json({
            status: 'success',
            message: 'Service created successfully',
            data: {
                service: newService,
            },
        });
    } catch (error) {
        next(error);
    }
};
const getServices = async (req, res, next) => {
    try {
        const [errGetServices, services] = await to(Service.find());

        if (errGetServices) {
            return res.status(500).json({
                status: 'error',
                message: 'Error getting services',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Get services successfully',
            data: {
                services: services,
            },
        });
    } catch (error) {
        next(error);
    }
};

const updateService = async (req, res, next) => {
    const { sid } = req.params;
    const { title, description } = req.body;

    try {
        const [errFindService, service] = await to(Service.findById(sid));

        if (errFindService) {
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error',
            });
        }

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service does not exist',
            });
        }

        const [errUpdateService, updatedService] = await to(
            Service.findByIdAndUpdate(sid, { title, description }, { new: true }),
        );

        if (errUpdateService) {
            return res.status(500).json({
                status: 'error',
                message: 'Error updating service',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Service updated successfully',
            data: {
                service: updatedService,
            },
        });
    } catch (error) {
        next(error);
    }
};
const deleteService = async (req, res, next) => {
    const { sid } = req.params;

    try {
        const [errFindService, service] = await to(Service.findById(sid));

        if (errFindService) {
            return res.status(500).json({
                status: 'error',
                message: 'Error finding service',
            });
        }

        if (!service) {
            return res.status(404).json({
                status: 'error',
                message: 'Service does not exist',
            });
        }
        const [errDeleteService] = await to(Service.findByIdAndRemove(sid));

        if (errDeleteService) {
            return res.status(500).json({
                status: 'error',
                message: 'Error deleting service',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Service deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    getServices,
    createService,
    updateService,
    deleteService,
};
