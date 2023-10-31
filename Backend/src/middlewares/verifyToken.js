const jwt = require('jsonwebtoken');

const verifyToken = {
    verifyAccessToken: (req, res, next) => {
        if (req?.headers?.authorization?.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decode) => {
                if (err) {
                    return res.status(401).json({
                        status: 'fail',
                        message: 'Invalid access token',
                    });
                }
                req.user = decode;
                next();
            });
        } else {
            return res.status(401).json({
                status: 'fail',
                message: 'Require authentication!!!',
            });
        }
    },

    verifyIsAdmin: (req, res, next) => {
        const { isAdmin } = req.user;
        if (isAdmin) {
            return res.status(401).json({
                status: 'fail',
                message: 'REQUIRE ADMIN ROLE',
            });
        }
        next();
    },
};
module.exports = verifyToken;
