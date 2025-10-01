import express from "express";
import dotenv from "dotenv";
import inscripcionesRoutes from "./routes/inscripciones.js";
import { initTables } from "./models/initTables.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Habilitar CORS
app.use(cors({
  origin: "*", // <- la URL de tu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

// Rutas
app.use("/api/inscripciones", inscripcionesRoutes);

// Iniciar servidor
app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  await initTables();
});
