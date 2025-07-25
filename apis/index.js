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

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
