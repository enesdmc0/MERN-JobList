import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import  jobsRoute  from './routes/job.js';
import cors from 'cors';
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);
app.use(cors());

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDb");
    }catch (err){
        console.log(err)
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
})

app.use(express.json());
app.use("/api/jobs", jobsRoute);

app.listen("1907", () => {
    connectDB();
    console.log("Backend is running!")
});