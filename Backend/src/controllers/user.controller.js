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
        const avatarUrl = `${process.env.SERVER_URI}/api/image/${user.avatar}`;
        return res.status(200).json({
            success: true,
            data: {
                user: {
                    ...user.toObject(),
                    avatar: avatarUrl,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const editUser = async (req, res, next) => {
    try {
        const { _id: uid } = req.user;
        const update = req.body;
        let avatar;
        if (req.file) {
            avatar = req.file.filename;
        }

        if (!uid) {
            return res.status(400).json({
                success: false,
                message: 'Missing input',
            });
        }

        const [errEdit, editedUser] = await to(
            User.findByIdAndUpdate(
                uid,
                {
                    ...update,
                    avatar,
                },
                { new: true },
            ),
        );

        if (errEdit) {
            return res.status(500).json({
                success: false,
                message: 'Error updating user',
            });
        }

        if (editedUser) {
            return res.status(200).json({
                success: true,
                data: {
                    user: editedUser,
                },
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = {
    getCurrentUser,
    editUser,
};
