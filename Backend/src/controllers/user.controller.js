const User = require('../models/user.model');
const to = require('await-to-js').default;

const getCurrentUser = async (req, res, next) => {
    try {
        const { _id: uid } = req.user;
        if (!uid) {
            return res.status(400).json({
                success: false,
                message: 'Missing user ID',
            });
        }

        const user = await User.findById(uid).select('-refreshToken -password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: 'success',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCurrentUser,
};
