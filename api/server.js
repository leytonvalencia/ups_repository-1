import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import bodyParser from 'body-parser';

import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js"
import reviewRoute from "./routes/review.route.js"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"

let isConnected = false;
dotenv.config();
const app = express()

 const connectToDB = async () => {
    mongoose.set('bufferCommands', false);
    mongoose.set('strictQuery', true)

    if(isConnected) return console.log('Already connected to MongoDB')
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log(error);
      }
}

app.use(cors({ origin: "https://ups-net.onrender.com", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/gigs",gigRoute)
app.use('/', gigRoute);
app.use("/api/reviews",reviewRoute)
app.use((err,req,res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"

    return res.status(errorStatus).send(errorMessage)
})


 
app.listen(8800, () =>{
    connectToDB();
    console.log("Backend server is running")
})