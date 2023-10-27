const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const to = require('await-to-js').default;

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const register = async (req, res, next) => {
    const { email, password, firstname, lastname, phone } = req.body;
    const [err, existingUser] = await to(User.findOne({ email }));
    if (err) throw err;
    if (existingUser) {
        return res.status(404).json({
            status: 'fail',
            message: 'Email has already been used!',
        });
    }
    const [errCreateUser, newUser] = await to(
        User.create({
            email: email,
            password: hashPassword(password),
            firstname: firstname,
            lastname: lastname,
            phone: phone,
        }),
    );
    if (errCreateUser) {
        return res.status(500).json({
            status: 'fail',
            message: 'Register is fail!',
        });
    }
    return res.status(200).json({
        status: 'success',
        message: 'Register is successful!',
        userData: newUser,
    });
};
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const response = await User.findOne({ email });
        if (!response) {
            return res.status(500).json({
                status: 'fail',
                message: 'Email does not exist!',
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, response.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({
                status: 'fail',
                message: 'Password is incorrect!',
            });
        }

        const { password: userPassword, isAdmin, refreshToken, ...userData } = response.toObject();
        const accessToken = generateAccessToken(response._id, isAdmin);
        const newRefreshToken = generateRefreshToken(response._id);
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({
            status: 'success',
            accessToken,
            userData,
        });
    } catch (error) {
        next(error);
    }
};
const logout = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        if (!cookie || !cookie.refreshToken) {
            return res.status(200).json({
                status: 'fail',
                message: 'No refresh token in cookies',
            });
        }
        await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true });
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        });
        return res.status(200).json({
            status: 'success',
            message: 'Logout is done',
        });
    } catch (error) {
        next(error);
    }
};
const refreshAccessToken = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        if (!cookie || !cookie.refreshToken) {
            return res.status(200).json({
                status: 'fail',
                message: 'No refresh token in cookies',
            });
        }
        const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_REFRESH_KEY);
        const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken });
        return res.status(200).json({
            status: 'success',
            newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh token not matched',
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
