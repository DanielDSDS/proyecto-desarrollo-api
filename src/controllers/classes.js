const e = require("express");
const pool = require("../db");

class ClassesController {

  async getClasses(req, response) {
    try {
      const data = await pool.query('SELECT * FROM materia;', function (e, res) {
        if (e) throw e;
        console.log(res);
        return res.rows;
      });
      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async getClass(req, response) {
    try {
      const { id } = req.params;
      const data = await pool.query('SELECT * FROM materia WHERE NRC = $1;', [id], function (e, res) {
        if (e) throw e;
        console.log(res);
        return res.rows;
      });

      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async getClassFromUserId(req, response) {
    try {
      const { id } = req.params;
      const data = await pool.query('SELECT * FROM materia WHERE  = $1;', [id], function (e, res) {
        if (e) throw e;
        console.log(res);
        return res.rows;
      });

      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async createClass(req, response) {
    try {
      const {
        idCarrera,
        nombreMateria,
        numInscritos,
        numInteracciones,
        cedulaProfesor,
        cedulaDelegado,
      } = req.body;
      const data = await pool.query('INSERT INTO materia (NRC, id_carrera, nombre_materia, num_inscritos, num_interacciones, cedula_profesor, cedula_delegado) VALUES ($1,$2,$3,$4,$5,$6,$7);',
        ['DEFAULT', idCarrera, nombreMateria, numInscritos, numInteracciones, cedulaProfesor, cedulaDelegado],
        function (e, res) {
          if (e) throw e;
          console.log('Se insertaron ' + res.affectedRows + ' campos');
          return res;
        });

      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }


  async updateClass(req, response) {
    try {
      const { id } = req.params;
      const {
        idCarrera,
        nombreMateria,
        numInscritos,
        numInteracciones,
        cedulaProfesor,
        cedulaDelegado,
      } = req.body;
      const data = await pool.query('UPDATE materia SET id_carrera=$1,nombre_materia=$2,num_inscritos=$3,num_interacciones=$4,cedula_profesor=$5,cedula_delegado=$6 WHERE NRC=$7',
        [idCarrera, nombreMateria, numInscritos, numInteracciones, cedulaProfesor, cedulaDelegado, id],
        function (e, res) {
          if (e) throw e;
          console.log('Materia actualizada');
          return res;
        });

      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async deleteClass(req, response) {
    try {
      const { id } = req.params;
      const data = await pool.query('DELETE FROM materia WHERE NRC = $1;', [id], function (e, res) {
        if (e) throw e;
        console.log(res);
        return res;
      })

      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }
}

module.exports = new ClassesController()