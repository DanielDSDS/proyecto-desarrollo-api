const e = require("express");
const pool = require("../db");

class CareerController {

  async getCareers(req, res) {
    pool.query('SELECT * FROM carrera;', function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }

  async getCareer(req, res) {
    const { id } = req.params;
    pool.query('SELECT * FROM carrera WHERE id = ?;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }

  async createCareer(req, res) {
    const {
      nombreCarrera
    } = req.body;
    pool.query('INSERT INTO carrera (id, nombre_carrera) VALUES ?;',
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
    pool.query('UPDATE carrera SET nombre_carrera=? WHERE id=?',
      [nombreCarrera, id],
      function (e, res) {
        if (e) throw e;
        console.log('Carrera actualizada');
        return res;
      });
  }

  async deleteCareer(req, res) {
    const { id } = req.params;
    pool.query('DELETE FROM carrera WHERE id = ?;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }
}

module.exports = new CareerController()