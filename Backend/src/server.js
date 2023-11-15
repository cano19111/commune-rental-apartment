const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
var morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const { dbConnect } = require('./config/db.config');
const initRoutes = require('./routes');
const server = require('http').createServer(app);
app.use(
    cors({
        origin: process.env.CLIENT_URI,
        methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    }),
);
app.use(compression());
dbConnect();

app.use(morgan('dev'));
initRoutes(app);
app.use(
    session({
        secret: process.env.SECERT_SESSION,
        resave: false,
        saveUninitialized: true,
    }),
);
helmet({
    crossOriginResourcePolicy: false,
});
const PORT = process.env.SERVER_PORT || 3045;
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
