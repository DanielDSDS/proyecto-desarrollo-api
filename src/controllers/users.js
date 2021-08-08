const e = require("express");
const pool = require("../db");

class UsersController {
  async getUsers(req, res) {
    pool.query('SELECT * FROM usuario;', function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }

  async getUser(req, res) {
    const { id } = req.params;
    pool.query('SELECT * FROM usuario WHERE cedula = ?;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }

  async createUser(req, res) {
    const {
      cedula,
      idCarrera,
      isAdmin,
      rol,
      nombre,
      apellido,
      email,
      clave,
      telefono,
    } = req.body;
    pool.query('INSERT INTO usuario (cedula, id_carrera, is_admin, rol, nombre, apellido, email, clave, telefono) VALUES ?;',
      [cedula, idCarrera, isAdmin, rol, nombre, apellido, email, clave, telefono],
      function (e, res) {
        if (e) throw e;
        console.log('Se insertaron ' + res.affectedRows + ' campos');
        return res;
      });
  }


  async updateUser(req, res) {
    const { id } = req.params;
    const {
      idCarrera,
      isAdmin,
      rol,
      nombre,
      apellido,
      email,
      clave,
      telefono,
    } = req.body;
    pool.query('UPDATE usuario SET id_carrera=?, is_admin=?, rol=?, nombre=?, apellido=?, email=?, clave=?, telefono=? WHERE cedula=?',
      [idCarrera, isAdmin, rol, nombre, apellido, email, clave, telefono, id],
      function (e, res) {
        if (e) throw e;
        console.log('Usuario actualizado ');
        return res;
      });
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    pool.query('DELETE FROM usuario WHERE cedula = ?;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }
}

module.exports = new UsersController()
