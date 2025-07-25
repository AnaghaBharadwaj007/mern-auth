import express from "express";
import { signup } from "../controllers/auth.controler.js";

const router = express.Router();

router.post("/sign-up", signup)

export default router;