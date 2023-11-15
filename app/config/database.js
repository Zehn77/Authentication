// Getting path to .env file
// const path = require('path');
// const envPath = path.join(__dirname, '..', '..', '.env');
// require('dotenv').config({path: envPath})

const mongoose = require("mongoose")

const { DATABASE_URL, DATABASE_NAME } = process.env

const connect = () => {
    const urlToDatabase = `${DATABASE_URL}${DATABASE_NAME}`
    mongoose.connect(urlToDatabase, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) =>{
        console.log(`Database connection failed.`)
        console.log(error)
        process.exit(1)
    })
}

exports.connect = connect