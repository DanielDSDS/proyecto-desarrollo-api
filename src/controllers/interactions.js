const e = require("express");
const pool = require("../db");

class InteractionsController {

  async getInteractions(req, res) {
    pool.query('SELECT * FROM interaccion;', function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }

  async getInteraction(req, res) {
    const { id } = req.params;
    pool.query('SELECT * FROM intreraccion WHERE id = ?;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }

  async createInteraction(req, res) {
    const {
      cedulaDelegado,
      cedulaProfesor,
      nrc,
      nombre_materia,
      tipo,
      horaInicio,
      horaFin,
      asistencia,
      observacionesProfesor,
      observacionesDelegado,
      nivelIncidencia,
      descripcionIncidencia,
      estado,
    } = req.body;
    pool.query('INSERT INTO interaccion (id, cedula_delegado, cedula_profesor, NRC, nombre_materia, tipo, hora_inicio, hora_fin, asistencia, observaciones_profesor, observaciones_delegado, nivel_incidencia, descripcion_incidencia, estado ) VALUES ?;',
      [
        'DEFAULT',
        cedulaDelegado,
        cedulaProfesor,
        nrc,
        nombre_materia,
        tipo,
        horaInicio,
        horaFin,
        asistencia,
        observacionesProfesor,
        observacionesDelegado,
        nivelIncidencia,
        descripcionIncidencia,
        estado],
      function (e, res) {
        if (e) throw e;
        console.log('Se inserto una interaccion ');
        return res;
      });
  }


  async updateInteraction(req, res) {
    const { id } = req.params;
    const {
      cedulaDelegado,
      cedulaProfesor,
      nrc,
      nombre_materia,
      tipo,
      horaInicio,
      horaFin,
      asistencia,
      observacionesProfesor,
      observacionesDelegado,
      nivelIncidencia,
      descripcionIncidencia,
      estado,
    } = req.body;
    pool.query('UPDATE interaccion SET cedula_delegado=?, cedula_profesor=?, NRC=?, nombre_materia=?, tipo=?, hora_inicio=?, hora_fin=?, asistencia=?, observaciones_profesor=?, observaciones_delegado=?, nivel_incidencia=?, descripcion_incidencia=?, estado=? WHERE id = ?;',
      [cedulaDelegado,
        cedulaProfesor,
        nrc,
        nombre_materia,
        tipo,
        horaInicio,
        horaFin,
        asistencia,
        observacionesProfesor,
        observacionesDelegado,
        nivelIncidencia,
        descripcionIncidencia,
        estado,
        id],
      function (e, res) {
        if (e) throw e;
        console.log('Se actualizo una interaccion ');
        return res;
      });
  }

  async deleteInteraction(req, res) {
    const { id } = req.params;
    pool.query('DELETE FROM interaccion WHERE id = ?;', [id], function (e, res) {
      if (e) throw e;
      console.log(res);
      return res;
    });
  }
}

module.exports = new InteractionsController()