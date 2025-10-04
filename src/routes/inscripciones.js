import { Router } from "express";
import client from "../config/db.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      nombre_chico,
      apellido_chico,
      nombre_responsable,
      apellido_responsable,
      celular_responsable,
      condicion_medica,
      detalle_condicion,
      plenaria,
      pago,
       edad
    } = req.body;

    if (!nombre_chico || !apellido_chico || !nombre_responsable || !apellido_responsable || !celular_responsable || !plenaria || edad === undefined) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos." });
    }

    if (condicion_medica && !detalle_condicion) {
      return res.status(400).json({ error: "Debe especificar el detalle de la condición médica." });
    }

    // INSERT con RETURNING id
    const result = await client.execute({
      sql: `
        INSERT INTO inscripciones 
        (nombre_chico, apellido_chico, nombre_responsable, apellido_responsable, celular_responsable, condicion_medica, detalle_condicion, plenaria, pago,  edad)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING id
      `,
      args: [
        nombre_chico,
        apellido_chico,
        nombre_responsable,
        apellido_responsable,
        celular_responsable,
        condicion_medica ? 1 : 0,
        detalle_condicion || null,
        plenaria,
        pago || false,
        edad
      ],
    });

    // result.rows[0].id contiene el id generado
    res.status(201).json({
      message: "Inscripción creada correctamente.",
      id: result.rows[0].id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear inscripción." });
  }
});




// GET -> Listar inscripciones
router.get("/", async (req, res) => {
  try {
    const result = await client.execute("SELECT * FROM inscripciones ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener inscripciones." });
  }
});

router.patch("/asistencia/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { plenaria, asistio } = req.body; // plenaria: 1-4, asistio: true/false

    if (![1, 2, 3, 4].includes(plenaria)) {
      return res.status(400).json({ error: "Plenaria inválida. Debe ser 1, 2, 3 o 4." });
    }

    const column = `asistio_plenaria${plenaria}`;

    const result = await client.execute({
      sql: `UPDATE inscripciones SET ${column} = ? WHERE id = ?`,
      args: [asistio ? 1 : 0, id],
    });

    res.json({ message: `Asistencia plenaria ${plenaria} actualizada correctamente.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar asistencia." });
  }
});

router.patch("/edad/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { edad } = req.body;

    if (edad === undefined || isNaN(edad)) {
      return res.status(400).json({ error: "Debe proporcionar una edad válida." });
    }

    const result = await client.execute({
      sql: `UPDATE inscripciones SET edad = ? WHERE id = ?`,
      args: [edad, id],
    });

    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: "Inscripción no encontrada." });
    }

    res.json({ message: "Edad actualizada correctamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar edad." });
  }
});

export default router;
