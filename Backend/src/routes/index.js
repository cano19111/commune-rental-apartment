const authRouter = require('./auth');
const userRouter = require('./user');
const serviceRouter = require('./service');

const { notFound, errHandler } = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/service', serviceRouter);

    app.use(notFound);
    app.use(errHandler);
};

module.exports = initRoutes;
