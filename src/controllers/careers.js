const e = require("express");
const pool = require("../db");

class CareerController {

  async getCareers(req, response) {
    try {
      const data = await pool.query('SELECT * FROM carrera;', function (e, res) {
        if (e) throw e;
        console.log(res);
        return res.rows;
      });
      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async getCareer(req, response) {
    try {
      const { id } = req.params;
      const data = await pool.query('SELECT * FROM carrera WHERE id = $1;', [id], function (e, res) {
        if (e) throw e;
        console.log(res);
        return res.rows;
      });
      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async createCareer(req, response) {
    try {
      const {
        nombreCarrera
      } = req.body;
      const data = await pool.query('INSERT INTO carrera (id, nombre_carrera) VALUES(DEFAULT,$1);',
        [nombreCarrera],
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


  async updateCareer(req, response) {
    try {
      const { id } = req.params;
      const {
        nombreCarrera
      } = req.body;
      const data = await pool.query('UPDATE carrera SET nombre_carrera=$1 WHERE id=$2',
        [nombreCarrera, id],
        function (e, res) {
          if (e) throw e;
          console.log('Carrera actualizada');
          return res;
        });
      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async deleteCareer(req, response) {
    try {
      const { id } = req.params;
      const data = await pool.query('DELETE FROM carrera WHERE id = $1;', [id], function (e, res) {
        if (e) throw e;
        console.log(res);
        return res;
      });
      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }
}

module.exports = new CareerController()