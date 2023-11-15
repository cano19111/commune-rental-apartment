const validateRequest = (schema, parse) => async (req, res, next) => {
    try {
        if (parse) {
            const parsedData = {};
            Object.entries(req.body).forEach(([key, value]) => {
                if (key !== 'images') {
                    try {
                        value = JSON.parse(value);
                    } catch (error) {}
                }
                parsedData[key] = value;
            });
            Object.assign(req.body, parsedData);
        }
        await schema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    validateRequest,
};
