import express from "express";
import { signUp,login } from "../controllers/UserController.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register",signUp);

// POST /api/auth/login
router.post("/login", login);

export default router;