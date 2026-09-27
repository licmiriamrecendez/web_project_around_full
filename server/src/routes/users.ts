import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  getCurrentUser,
  updateUser,
  updateAvatar, } from '../controllers/users.js';


const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.get("/me", getCurrentUser);

usersRouter.patch("/me", updateUser);

usersRouter.patch("/me/avatar", updateAvatar);

usersRouter.get("/:id", getUserById);

usersRouter.post("/", createUser);

export { usersRouter };