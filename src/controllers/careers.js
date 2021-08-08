const e = require("express");
const pool = require("../db");

class CareerController {

  async getCareers(req, res) {
    pool.query('SELECT * FROM carrera;', function (e, res) {
      if (e) throw e;
      console.log(res);
      return res.rows;
    });
  }

  async getCareer(req, res) {
    const { id } = req.params;
    pool.query('SELECT * FROM carrera WHERE id = $1;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res.rows;
    });
  }

  async createCareer(req, res) {
    const {
      nombreCarrera
    } = req.body;
    pool.query('INSERT INTO carrera (id, nombre_carrera) VALUES($1,$2);',
      ['DEFAULT', nombreCarrera],
      function (e, res) {
        if (e) throw e;
        console.log('Se insertaron ' + res.affectedRows + ' campos');
        return res;
      });
  }


  async updateCareer(req, res) {
    const { id } = req.params;
    const {
      nombreCarrera
    } = req.body;
    pool.query('UPDATE carrera SET nombre_carrera=$1 WHERE id=$2',
      [nombreCarrera, id],
      function (e, res) {
        if (e) throw e;
        console.log('Carrera actualizada');
        return res;
      });
  }

  async deleteCareer(req, res) {
    const { id } = req.params;
    pool.query('DELETE FROM carrera WHERE id = $1;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }
}

module.exports = new CareerController()