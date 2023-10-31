const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found!`);
    res.status(404);
    next(error);
};

const errHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.log(error);
    return res.status(statusCode).json({
        success: false,
        message: error?.message || error,
        //message: 'Error from server',
    });
};

module.exports = {
    notFound,
    errHandler,
};
