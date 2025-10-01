import client from "../config/db.js";

export const initTables = async () => {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS inscripciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_chico TEXT NOT NULL,
        apellido_chico TEXT NOT NULL,
        nombre_responsable TEXT NOT NULL,
        apellido_responsable TEXT NOT NULL,
        celular_responsable TEXT NOT NULL,
        condicion_medica BOOLEAN NOT NULL,
        detalle_condicion TEXT,
        plenaria TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        pago BOOLEAN
      );
    `);

    console.log("✅ Tablas inicializadas correctamente.");
  } catch (error) {
    console.error("❌ Error creando tablas:", error);
  }
};
