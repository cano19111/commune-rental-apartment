const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const to = require('await-to-js').default;

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const register = async (req, res, next) => {
    try {
        const { email, password, firstname, lastname, phone } = req.body;
        const [errExistingUser, existingUser] = await to(User.findOne({ email }));

        if (errExistingUser) {
            return res.status(500).json({
                success: false,
                message: 'Error find user',
            });
        }

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email has already been used!',
            });
        }

        const [errCreateUser, newUser] = await to(
            User.create({
                email,
                password: hashPassword(password),
                firstname,
                lastname,
                phone,
            }),
        );
        if (errCreateUser) {
            return res.status(500).json({
                success: false,
                message: 'Error user register',
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Register is successful!',
            data: {
                user: {
                    _id: newUser._id,
                    email: newUser.email,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    phone: newUser.phone,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const [errUser, user] = await to(User.findOne({ email }));

        if (errUser) {
            return res.status(500).json({
                success: false,
                message: 'Error finding user',
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            });
        }

        const [errPassword, isPasswordCorrect] = await to(bcrypt.compare(password, user.password));

        if (errPassword) {
            return res.status(500).json({
                success: false,
                message: 'Password incorrect',
            });
        }

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password!',
            });
        }
        const { password: userPassword, isAdmin, refreshToken, ...userData } = user.toObject();
        const accessToken = generateAccessToken(user._id, isAdmin);
        const newRefreshToken = generateRefreshToken(user._id);
        const [errUpdate] = await to(
            User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken }, { new: true }),
        );
        if (errUpdate) {
            return res.status(500).json({
                success: false,
                message: 'Error updating user',
            });
        }

        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

        return res.status(200).json({
            success: true,
            data: {
                accessToken,
                user: userData,
            },
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'No refresh token in cookies',
            });
        }

        const [errUpdate, updatedUser] = await to(
            User.findOneAndUpdate({ refreshToken }, { refreshToken: '' }, { new: true }),
        );

        if (errUpdate) {
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        });
        return res.status(200).json({
            success: true,
            message: 'Logout is done',
        });
    } catch (error) {
        next(error);
    }
};

const refreshAccessToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'No refresh token in cookies',
            });
        }

        const decodedToken = await jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token',
            });
        }

        const [errFindUser, user] = await to(User.findOne({ _id: decodedToken._id, refreshToken }));

        if (errFindUser || !user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token',
            });
        }

        const newAccessToken = generateAccessToken(user._id, user.role);

        return res.status(200).json({
            success: true,
            newAccessToken,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    logout,
    refreshAccessToken,
};
