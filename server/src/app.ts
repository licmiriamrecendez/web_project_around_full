import express from "express";
import  router  from "./routes/index.js";
import {errorHandler} from "./middleware/error-handler.js";
import mongoose from "mongoose";
import cors from "cors";

mongoose
.connect("mongodb://127.0.0.1:27017/aroundb")
.then(() => {
  console.warn("Conectado a MongoDB");
})
.catch((error) => {
  console.error("Error de conexion:", error);
});

const app = express();

const PORT = 3001

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "6a9ac7bd221ff565b454c386",
  };

  next();
});

app.use(router);

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado",
   });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.warn(`Servidor ejecutandose en el puerto ${PORT}`);
});