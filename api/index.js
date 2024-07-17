import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import path from "path";
const __dirname = path.resolve();
dotenv.config();
const app = express();
const PORT = 3000;
mongoose.connect(process.env.MONGO).then((d) => {
  console.log("Database connected");
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    message,
  });
  next();
});
app.listen(PORT, () => {
  console.log("your server is starting at " + PORT);
});
