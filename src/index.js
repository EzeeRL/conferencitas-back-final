import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import inscripcionesRoutes from "./routes/inscripciones.js";
import { initTables } from "./models/initTables.js";

dotenv.config();

const app = express();

// Habilitar CORS
app.use(cors({
  origin: "*", // o reemplazá con la URL de tu frontend
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true,
}));
app.use(express.json());

// Rutas
app.use("/api/inscripciones", inscripcionesRoutes);

// Inicializar tablas (opcional en serverless)
initTables().catch(console.error);

// Exportar la app para Vercel
export default app;
