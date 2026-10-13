import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({}).select(
    "_id name about avatar"
  );

  res.send(users);
};


export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findById(id).select(
    "_id name about avatar"
  );

  if (!user) {
    throw Object.assign(
      new Error("No se encontró ningún usuario con ese id"),
      { statusCode: 404 },
    );
  }

  res.send(user);
};



export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about, avatar, email, password } = req.body;

    // Validar campos obligatorios (comprobacion adicional)
    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      res.status(400).send({
        message: "Email y password son obligatorios",
      });
      return;
    }

    // Validar longitud de contraseña (comprobacion adicional)
    if (password.length < 8) {
      res.status(400).send({
        message: "La contraseña debe tener al menos 8 caracteres",
      });
      return;
    }

    // Crear hash de contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario en MongoDB
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    // Responder sin contraseña
    res.status(201).send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });

  } catch (error: unknown) {
    // Correo duplicado en MongoDB
    if (
      error !== null &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      res.status(409).send({
        message: "Este correo ya está registrado",
      });
      return;
    }

    // Otros errores
    next(error);
  }
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


const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET no está configurado");
}

const token = jwt.sign(
  { _id: user._id.toString() },
  jwtSecret,
  { expiresIn: "7d" }
);



res.send({
  message: "Inicio de sesión correcto",
  token,
  user: {
    _id: user._id,
    email: user.email,
    name: user.name,
    about: user.about,
    avatar: user.avatar,
  },
});
}