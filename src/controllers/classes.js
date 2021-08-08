const e = require("express");
const pool = require("../db");

class ClassesController {

  async getClasses(req, res) {
    pool.query('SELECT * FROM materia;', function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }

  async getClass(req, res) {
    const { id } = req.params;
    pool.query('SELECT * FROM materia WHERE NRC = ?;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }

  async createClass(req, res) {
    const {
      idCarrera,
      nombreMateria,
      numInscritos,
      numInteracciones,
      cedulaProfesor,
      cedulaDelegado,
    } = req.body;
    pool.query('INSERT INTO materia (NRC, id_carrera, nombre_materia, num_inscritos, num_interacciones, cedula_profesor, cedula_delegado) VALUES ?;',
      ['DEFAULT', idCarrera, nombreMateria, numInscritos, numInteracciones, cedulaProfesor, cedulaDelegado],
      function (e, res) {
        if (e) throw e;
        console.log('Se insertaron ' + res.affectedRows + ' campos');
        return res;
      });
  }


  async updateClass(req, res) {
    const { id } = req.params;
    const {
      idCarrera,
      nombreMateria,
      numInscritos,
      numInteracciones,
      cedulaProfesor,
      cedulaDelegado,
    } = req.body;
    pool.query('UPDATE materia SET id_carrera=?,nombre_materia=?,num_inscritos=?,num_interacciones=?,cedula_profesor=?,cedula_delegado=? WHERE NRC=?',
      [idCarrera, nombreMateria, numInscritos, numInteracciones, cedulaProfesor, cedulaDelegado, id],
      function (e, res) {
        if (e) throw e;
        console.log('Materia actualizada');
        return res;
      });
  }

  async deleteClass(req, res) {
    const { id } = req.params;
    pool.query('DELETE FROM materia WHERE NRC = ?;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }
}

module.exports = new ClassesController()