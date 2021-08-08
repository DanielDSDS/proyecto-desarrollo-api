const CareerController = require("../../controller/career")
const express = require("express");
const router = express.Router();


//Create a new career

router.post("/careers", CareerController.createCareer);

// Obtener carreras 

router.get("/careers", CareerController.getCareers);

// Obtener carrera 

router.get("/careers/:id", CareerController.getCareer);

// Obtener carreras 

router.put("/careers/:id", CareerController.updateCareer);

// Eliminar carrera 

router.delete("/careers/:id", CareerController.deleteCareer);

exports.Careers = router;
