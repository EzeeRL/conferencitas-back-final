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
      pago
    } = req.body;

    if (!nombre_chico || !apellido_chico || !nombre_responsable || !apellido_responsable || !celular_responsable || !plenaria) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben estar completos." });
    }

    if (condicion_medica && !detalle_condicion) {
      return res.status(400).json({ error: "Debe especificar el detalle de la condición médica." });
    }

    // INSERT con RETURNING id
    const result = await client.execute({
      sql: `
        INSERT INTO inscripciones 
        (nombre_chico, apellido_chico, nombre_responsable, apellido_responsable, celular_responsable, condicion_medica, detalle_condicion, plenaria, pago)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        pago || false
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

export default router;
