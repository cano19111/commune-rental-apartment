const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (mongoose.connection.readyState) {
            console.log('Mongoose connection is successful!');
        } else {
            console.log('Mongoose connection is not open');
        }
    } catch (error) {
        console.log('Mongoose connection failed');
        throw new Error(error);
    }
};

module.exports = { dbConnect };
