const UsersController = require("../../controllers/users")
const express = require("express");
const router = express.Router();

// Crear nueva user 

router.post("/users", UsersController.createUser);

// Obtener users 

router.get("/users", UsersController.getUsers);

//Obtener user 
router.get("/users/:id", UsersController.getUser);

// Actualizar users  

router.put("/users/:id", UsersController.updateUser);

// Eliminar users 

router.delete("/users/:id", UsersController.deleteUser);

module.exports = router;