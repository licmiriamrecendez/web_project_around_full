import app, { connectDB } from "./app.js";

const PORT = Number(process.env.PORT) || 3001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.warn(`Servidor ejecutándose en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
