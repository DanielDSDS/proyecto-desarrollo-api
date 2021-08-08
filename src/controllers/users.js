const e = require("express");
const pool = require("../db");

class UsersController {
  async getUsers(req, res) {
    pool.query('SELECT * FROM usuario;', function (e, res) {
      if (e) throw e;
      console.log(res);
      return res.rows;
    });
  }

  async getUser(req, res) {
    const { id } = req.params;
    pool.query('SELECT * FROM usuario WHERE cedula = $1;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res.rows;
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
    pool.query('INSERT INTO usuario (cedula, id_carrera, is_admin, rol, nombre, apellido, email, clave, telefono) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);',
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
    pool.query('UPDATE usuario SET id_carrera=$1, is_admin=$2, rol=$3, nombre=$4, apellido=$5, email=$6, clave=$7, telefono=$8 WHERE cedula=$9',
      [idCarrera, isAdmin, rol, nombre, apellido, email, clave, telefono, id],
      function (e, res) {
        if (e) throw e;
        console.log('Usuario actualizado ');
        return res;
      });
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    pool.query('DELETE FROM usuario WHERE cedula = $1;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }
}

module.exports = new UsersController()
