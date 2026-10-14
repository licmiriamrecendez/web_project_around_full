import "dotenv/config";
import express from "express";
import  router  from "./routes/index.js";
import {errorHandler} from "./middleware/error-handler.js";
import mongoose from "mongoose";
import cors from "cors";


import dns from "node:dns";



const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/aroundb";

dns.setServers(["8.8.8.8"]);



export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(MONGO_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10000,
  });

  console.warn("Conectado a MongoDB");
};


const app = express();

app.set("trust proxy", 1);

const PORT = Number(process.env.PORT) || 3001;

const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: CLIENT_ORIGIN }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(router);


app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado",
   });
});

app.use(errorHandler);

export default app;