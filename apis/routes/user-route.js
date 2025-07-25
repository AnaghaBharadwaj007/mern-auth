import express from "express";
import { test } from "../controllers/user.controler.js";

const router = express.Router()

router.get("/", test)

export default router;
//since we are exporting by default we can import it with any name.