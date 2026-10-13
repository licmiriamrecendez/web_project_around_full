import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  // Comprobar que exista el token
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).send({
      message: "Autorización requerida",
    });
    return;
  }


const token = authorization.split(" ")[1];

if (!token) {
  res.status(401).send({
    message: "Token no proporcionado",
  });
  return;
}


  try {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET no está configurado");
    }

    const payload = jwt.verify(token, jwtSecret);

    if (
      typeof payload === "string" ||
      typeof payload._id !== "string"
    ) {
      res.status(401).send({
        message: "Token inválido",
      });
      return;
    }

    req.user = { _id: payload._id };

    next();
  } catch (error) {
    if (!process.env.JWT_SECRET) {
      next(error);
      return;
    }

    res.status(401).send({
      message: "Token inválido o expirado",
    });
  }
};

export default auth;
