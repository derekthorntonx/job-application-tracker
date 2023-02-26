import { config } from 'dotenv';
config();
import express from 'express';
import mongoose from 'mongoose';
import applicationRouter from './routes/applications.js';
import userRouter from './routes/users.js';
import cors from 'cors';

const CONNECTION_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors('http://72.140.1.8'));
app.use(express.json());
mongoose.set('strictQuery', false);

mongoose.connect(CONNECTION_URL)                                                            //connect Mongoose to MongoDB cluster
.then(() => {app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)})})     //if connection successful, run server
.catch((err) => {console.log(err)});                                                        //else, log error

app.use('/applications', applicationRouter)
app.use('/user', userRouter);


