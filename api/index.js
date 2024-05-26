import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();
const app = express();
const PORT = 3001;

mongoose.connect(process.env.MONGO).then((d)=>{
    console.log("Database connected")
})
app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.listen(PORT,()=>{
    console.log("your server is starting at "+ PORT)
})