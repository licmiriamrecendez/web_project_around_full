import app, { connectDB } from "../src/app.js";
import type { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);

    return res.status(503).json({
      message: "No se pudo conectar con la base de datos",
    });
  }
}