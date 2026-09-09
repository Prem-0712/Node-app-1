import { connect } from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME
const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD
const MONGO_HOST = process.env.MONGO_HOST
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_DB_NAME = process.env.MONGO_DB_NAME

const DATABASE_URL = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;



const connectDB = async () => {
    try {
        await connect(DATABASE_URL);
        console.log('DATABASE CONNECTED SUCCESSFULLY !!!!');

    } catch (error) {
        console.log('DB CONNECTION ERROR: ', error);
        console.log('DB CONNECTION ERROR: ', DATABASE_URL);

    }
}

export default connectDB;