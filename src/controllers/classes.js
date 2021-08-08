const e = require("express");
const pool = require("../db");

class ClassesController {

  async getClasses(req, response) {
    try {
      const data = await pool.query('SELECT * FROM materia;', function (e, res) {
        if (e) throw e;
        response.status(200).json(res.rows)
      });
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async getClass(req, response) {
    try {
      const { id } = req.params;
      await pool.query('SELECT * FROM materia WHERE NRC = $1;', [id], function (e, res) {
        if (e) throw e;
        response.status(200).json(res.rows[0])
      });
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async getClassesFromUserId(req, response) {
    try {
      const { id } = req.params;
      await pool.query(
        `SELECT * FROM materia
          WHERE id_carrera IN(
            SELECT carrera.id FROM carrera 
		          WHERE carrera.id IN(
                SELECT usuario.id_carrera FROM usuario
				          WHERE usuario.cedula = $1 
              )
          )`,
        [id], function (e, res) {
          if (e) throw e;
          response.status(200).json(res.rows)
        });

    } catch (e) {
      response.status(400).json(e)
    }
  }

  async createClass(req, response) {
    try {
      const {
        nrc,
        idCarrera,
        nombreMateria,
        numInscritos,
        numInteracciones,
        cedulaProfesor,
        cedulaDelegado,
      } = req.body;
      console.log(req.body);
      await pool.query('INSERT INTO materia (NRC, id_carrera, nombre_materia, num_inscritos, num_interacciones, cedula_profesor, cedula_delegado) VALUES ($1,$2,$3,$4,$5,$6,$7);',
        [nrc, idCarrera, nombreMateria, numInscritos, numInteracciones, cedulaProfesor, cedulaDelegado],
        function (e, res) {
          if (e) throw e;
          response.status(200).json('Se creo materia')
        });

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
      await pool.query('UPDATE materia SET id_carrera=$1,nombre_materia=$2,num_inscritos=$3,num_interacciones=$4,cedula_profesor=$5,cedula_delegado=$6 WHERE NRC=$7',
        [idCarrera, nombreMateria, numInscritos, numInteracciones, cedulaProfesor, cedulaDelegado, id],
        function (e, res) {
          if (e) throw e;
          response.status(200).json('Se actualizo una materia')
        });
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async deleteClass(req, response) {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM materia WHERE NRC = $1;', [id], function (e, res) {
        if (e) throw e;
        console.log(res);
        response.status(200).json('Se borro una materia')
      })
    } catch (e) {
      response.status(400).json(e)
    }
  }
}

module.exports = new ClassesController()