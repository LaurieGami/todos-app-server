import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL

async function dbConnection() {
    try {
        mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (error) => {
            if (error) console.log('An error occurred when trying to connect to the database!', error)
        })
        console.log(`🐣 Successful database connection.`)
        return mongoose.connection
    } catch (err) {
        console.log('Failed to connect to MongoDB', err)
        return
    }
}

export default dbConnection;
