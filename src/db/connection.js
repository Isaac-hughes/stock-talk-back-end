require('dotenv').config();
const mongoose = require('mongoose')

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
        console.log('successfully connected to mongodb')
    } catch (error) {
        console.log(error)
    }
};

connection();