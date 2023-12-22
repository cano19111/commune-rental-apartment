const fs = require('fs').promises;
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const jwt = require('jsonwebtoken');
const to = require('await-to-js').default;
const { generateToken, sendMail } = require('../utils/helpers');

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const register = async (req, res) => {
    try {
        const { email } = req.body;
        let err, existingUser, newUser;

        [err, existingUser] = await to(User.findOne({ email }));
        if (err) {
            return res.status(500).json({ success: false, message: 'Error checking existing user' });
        }

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
        }

        const confirmationToken = generateToken();

        [err, newUser] = await to(User.create({ email, confirmationToken: confirmationToken }));
        if (err) {
            return res.status(500).json({ success: false, message: 'Error registering user' });
        }

        const [readError, htmlTemplate] = await to(fs.readFile('src/template/confirmMailTemplate.html', 'utf-8'));
        if (readError) {
            return res
                .status(500)
                .json({ success: false, message: 'Error reading email template', error: readError.message });
        }
        const emailHtml = htmlTemplate.replace(
            '{{confirmationUrl}}',
            `${process.env.SERVER_URI}/api/auth/confirm-email?token=${confirmationToken}`,
        );
        let [mailError] = await to(sendMail({ email, html: emailHtml, subject: 'Confirm email' }));
        if (mailError) {
            console.log(mailError);
            return res.status(500).json({ success: false, message: 'Error sending email', error: mailError.message });
        }

        res.status(201).json({
            success: true,
            message: 'Registration successful. Please check your email to confirm',
        });
    } catch (error) {
        next(error);
    }
};

const confirmEmail = async (req, res) => {
    const { token } = req.query;
    let err, user;

    [err, user] = await to(User.findOne({ confirmationToken: token }));
    if (err) {
        return res.status(500).send('Internal server error');
    }

    if (!user) {
        return res.status(400).send('Invalid or expired token');
    }

    user.emailConfirmed = true;

    [err] = await to(user.save());
    if (err) {
        return res.status(500).send('Internal server error');
    }

    res.redirect(`${process.env.CLIENT_URI}/set-password/${user._id}`);
};

const setPassword = async (req, res, next) => {
    try {
        const { userId, password } = req.body;
        let err, user;

        [err, user] = await to(User.findById(userId));
        if (err) {
            return res.status(500).json({ success: false, message: 'Error finding user' });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.emailConfirmed) {
            return res.status(400).json({ success: false, message: 'Email has not been confirmed' });
        }

        const passwordHash = hashPassword(password);
        const { isAdmin } = user.toObject();
        const accessToken = generateAccessToken(user._id, isAdmin);
        const newRefreshToken = generateRefreshToken(user._id);
        const [errUpdate, updateUser] = await to(
            User.findByIdAndUpdate(
                user._id,
                { refreshToken: newRefreshToken, password: passwordHash },
                { new: true },
            ).select('-password -refreshToken'),
        );
        if (errUpdate) {
            return res.status(500).json({
                success: false,
                message: 'Error updating user',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Password has been set successfully',
            data: {
                accessToken,
                user: updateUser,
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
    confirmEmail,
    setPassword,
};
