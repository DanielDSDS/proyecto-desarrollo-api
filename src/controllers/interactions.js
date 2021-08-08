const e = require("express");
const pool = require("../db");

class InteractionsController {

  async getInteractions(req, res) {
    try {
      const data = await pool.query('SELECT * FROM interaccion;', function (e, res) {
        if (e) throw e;
        console.log(res.rows);
        return res.rows;
      });
      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async getInteraction(req, res) {
    try {
      const { id } = req.params;
      const data = await pool.query('SELECT * FROM intreraccion WHERE id = $1;', [id], function (e, res) {
        if (e) throw e;
        console.log(res.rows);
        return res.rows;
      });
      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async getInteractionsFromTeacherId(req, res) {
    try {
      const { id } = req.params;
      const data = await pool.query('SELECT * FROM intreraccion WHERE cedula_profesor = $1;', [id], function (e, res) {
        if (e) throw e;
        console.log(res.rows);
        return res.rows;
      });
      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async createInteraction(req, res) {
    try {
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
      const data = await pool.query('INSERT INTO interaccion (id, cedula_delegado, cedula_profesor, NRC, nombre_materia, tipo, hora_inicio, hora_fin, asistencia, observaciones_profesor, observaciones_delegado, nivel_incidencia, descripcion_incidencia, estado ) VALUES (DEFAULT, $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);',
        [
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
      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }


  async updateInteraction(req, res) {
    try {
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
      const data = await pool.query('UPDATE interaccion SET cedula_delegado=$1, cedula_profesor=$2, NRC=$3, nombre_materia=$4, tipo=$5, hora_inicio=$6, hora_fin=$7, asistencia=$8, observaciones_profesor=$9, observaciones_delegado=$10, nivel_incidencia=$11, descripcion_incidencia=$12, estado=$13 WHERE id = $14;',
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
      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async deleteInteraction(req, res) {
    try {
      const { id } = req.params;
      const data = await pool.query('DELETE FROM interaccion WHERE id = $1;', [id], function (e, res) {
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

module.exports = new InteractionsController()