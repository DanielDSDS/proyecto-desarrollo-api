const e = require("express");
const pool = require("../db");

class ClassesController {

  async getClasses(req, res) {
    pool.query('SELECT * FROM materia;', function (e, res) {
      if (e) throw e;
      console.log(res);
      return res.rows;
    });
  }

  async getClass(req, res) {
    const { id } = req.params;
    pool.query('SELECT * FROM materia WHERE NRC = $1;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res.rows;
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
    pool.query('INSERT INTO materia (NRC, id_carrera, nombre_materia, num_inscritos, num_interacciones, cedula_profesor, cedula_delegado) VALUES ($1,$2,$3,$4,$5,$6,$7);',
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
    pool.query('UPDATE materia SET id_carrera=$1,nombre_materia=$2,num_inscritos=$3,num_interacciones=$4,cedula_profesor=$5,cedula_delegado=$6 WHERE NRC=$7',
      [idCarrera, nombreMateria, numInscritos, numInteracciones, cedulaProfesor, cedulaDelegado, id],
      function (e, res) {
        if (e) throw e;
        console.log('Materia actualizada');
        return res;
      });
  }

  async deleteClass(req, res) {
    const { id } = req.params;
    pool.query('DELETE FROM materia WHERE NRC = $1;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }
}

module.exports = new ClassesController()