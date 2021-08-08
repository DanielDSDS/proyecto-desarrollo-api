const ClassesController = require("../../controllers/classes")
const express = require("express");
const router = express.Router();


// Crear nueva materia

router.post("/class", ClassesController.createClass);

// Obtener materias 

router.get("/class", ClassesController.getClasses);

// Obtener materia 

router.get("/class/:id", ClassesController.getClass);

// Actualizar materia  

router.put("/class/:id", ClassesController.updateClass);

// Eliminar materia 

router.delete("/class/:id", ClassesController.deleteClass);

exports.Classes = router;