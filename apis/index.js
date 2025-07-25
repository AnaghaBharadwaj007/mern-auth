import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth-route.js";
import userRoutes from "./routes/user-route.js";
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected successfully");
}).catch((err) => { console.log(err) })

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoute);


//this is the middleware to handle the error.
//and don't have to send error msg in above codes, just do next(err) it will be passed down to here.
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errmsg = err.message || "Internal server error"
  return res.status(statusCode).json({
    success: false,
    error: errmsg,
    statusCode,
  })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
