const e = require("express");
const pool = require("../db");

class InteractionsController {

  async getInteractions(req, response) {
    try {
      await pool.query('SELECT * FROM interaccion;', function (e, res) {
        if (e) throw e;
        response.status(200).json(res.rows)
      });
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async getInteraction(req, response) {
    try {
      const { id } = req.params;
      await pool.query('SELECT * FROM intreraccion WHERE id = $1;', [id], function (e, res) {
        if (e) throw e;
        response.status(200).json(res.rows[0])
      });
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async getInteractionsFromTeacherId(req, response) {
    try {
      const { id } = req.params;
      await pool.query('SELECT * FROM intreraccion WHERE cedula_profesor = $1;', [id], function (e, res) {
        if (e) throw e;
        response.status(200).json(res.rows)
      });
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async getInteractionsFromDelegadoId(req, response) {
    try {
      const { id } = req.params;
      await pool.query('SELECT * FROM intreraccion WHERE cedula_delegado = $1;', [id], function (e, res) {
        if (e) throw e;
        response.status(200).json(res.rows)
      });
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async createInteraction(req, response) {
    try {
      const {
        cedulaDelegado,
        cedulaProfesor,
        nrc,
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
      let nombre_materia = '';
      await pool.query('INSERT INTO interaccion (id, cedula_delegado, cedula_profesor, NRC, tipo, hora_inicio, hora_fin, asistencia, observaciones_profesor, observaciones_delegado, nivel_incidencia, descripcion_incidencia, estado ) VALUES (DEFAULT, $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);',
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
          response.status(200).json('Inserto una interaccion')
          return res;
        });
    } catch (e) {
      response.status(400).json(e)
    }
  }


  async updateInteraction(req, response) {
    try {
      const { id } = req.params;
      const {
        cedulaDelegado,
        cedulaProfesor,
        nrc,
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
      let nombre_materia = '';
      await pool.query('UPDATE interaccion SET cedula_delegado=$1, cedula_profesor=$2, NRC=$3, tipo=$5, hora_inicio=$6, hora_fin=$7, asistencia=$8, observaciones_profesor=$9, observaciones_delegado=$10, nivel_incidencia=$11, descripcion_incidencia=$12, estado=$13 WHERE id = $14;',
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
          response.status(200).json('Se actualizo una interaccion ')
          return res;
        });
    } catch (e) {
      response.status(400).json(e)
    }
  }

  async deleteInteraction(req, response) {
    try {
      const { id } = req.params;
      const data = await pool.query('DELETE FROM interaccion WHERE id = $1;', [id], function (e, res) {
        if (e) throw e;
        response.status(200).json('Borro una interaccion')
      });
      response.status(200).json(data)
    } catch (e) {
      response.status(400).json(e)
    }
  }
}

module.exports = new InteractionsController()