const authRouter = require('./auth');
const userRouter = require('./user');
const serviceRouter = require('./service');
const imageRouter = require('./image');
const apartmentRouter = require('./apartment');

const { notFound, errHandler } = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/service', serviceRouter);
    app.use('/api/image', imageRouter);
    app.use('/api/apartment', apartmentRouter);

    app.use(notFound);
    app.use(errHandler);
};

module.exports = initRoutes;
