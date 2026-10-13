
import { Router } from "express";
import { usersRouter } from "./users.js";
import { cardsRouter } from "./cards.js";
import { createUser, login } from "../controllers/users.js";
import auth from "../middleware/auth.js";
import { loginLimiter, signupLimiter } from "../middleware/limiter.js";

const router = Router();

// Rutas públicas
router.post("/signup", signupLimiter, createUser);
router.post("/signin", loginLimiter, login);

// Proteger las siguientes rutas
router.use(auth);

// Rutas privadas
router.use("/users", usersRouter);
router.use("/cards", cardsRouter);

export default router;
