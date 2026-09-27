import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({});

  res.send(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    throw Object.assign(
      new Error("No se encontró ningún usuario con ese id"),
      { statusCode: 404 },
    );
  }

  res.send(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    about,
    avatar,
    email,
    password: hashedPassword,
  });

  res.status(201).send({
  _id: user._id,
  email: user.email,
  name: user.name,
  about: user.about,
  avatar: user.avatar,
  });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw Object.assign(
      new Error("No se encontró ningún usuario con ese id"),
      { statusCode: 404 },
    );
  }

  res.send(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, about } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { name, about },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw Object.assign(
      new Error("No se encontró ningún usuario con ese id"),
      { statusCode: 404 },
    );
  }

  res.send(user);
};

export const updateAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { avatar },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw Object.assign(
      new Error("No se encontró ningún usuario con ese id"),
      { statusCode: 404 },
    );
  }

  res.send(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw Object.assign(
      new Error("Email o contraseña incorrectos"),
      { statusCode: 401 },
    );
  }

  const matched = await bcrypt.compare(password, user.password);

  if (!matched) {
    throw Object.assign(
      new Error("Email o contraseña incorrectos"),
      { statusCode: 401 },
    );
  }

  const token = jwt.sign(
  { _id: user._id },
  "super-secret-key",
  { expiresIn: "7d" }
);

  res.send({
    message: "Inicio de sesión correcto",
    token,
    user: {
      _id: user._id,
      email: user.email,
    },
  });
};