// importacion de express y de conexión.js (la base de datos de turismo ushuaia)

const express = require("express")
const conexion = require("../conexion")

// importacion del router Usuarios

const routerExcursiones = express.Router()

routerExcursiones.get("/:excursionId", (req, res) => {
  const excursionId = req.params.excursionId;

  conexion.query("SELECT * FROM excursiones WHERE id = ?", [excursionId], (err, result) => {
    if (err) {
      console.error(`Error al obtener detalles de la excursión ${excursionId}`, err);
      res.status(500).json({ error: `Error al obtener detalles de la excursión ${excursionId}` });
    } else {
      if (result.length === 0) {
        // Si no se encuentra ninguna excursión con el ID proporcionado, devolver un 404
        res.status(404).json({ error: "Excursión no encontrada" });
      } else {
        // Devuelve los detalles de la excursión en formato JSON
        res.status(200).json(result[0]);
      }
    }
  });
});


routerExcursiones.get("/", (req, res) => {
  
    conexion.query("SELECT * FROM excursiones", (err, result) => {
      if (err) {
        console.error("Error al obtener datos de excursiones:", err);
        res.status(500).json({ error: "Error al obtener datos de excursiones" });
      } else {
        res.status(200).json(result); // Devuelve los datos de excursiones en formato JSON
      }
    });
  });

routerExcursiones.post("/", (req, res) => { 

    const excursion = req.body.excursion;
    const descripcion_exc = req.body.descripcion_exc;
    const precio = req.body.precio;
    const urlImagen_exc = req.body.urlImagen_exc;
    const cupos = req.body.cupos;

    conexion.query("INSERT INTO excursiones (excursion, descripcion_exc, precio, urlImagen_exc, cupos) VALUES (?, ?, ?, ?, ?)", [excursion, descripcion_exc, precio, urlImagen_exc, cupos], (err, result) => {
        if(err) {
            console.log(err);
            res.json({status: "error", err})
        } else {
        
            if(result) {

                // en caso de que no se presenten errores, se procede a el envio de datos al servidor

                res.send(result);
            }else{

                // en caso de faltar valores, el mensaje sera...

                res.send({message: "Ingresa los registros faltantes!"})
            }
        }
    })
    })



// exportamos routersExcursiones para mostrarlo y ejecutarlo desde app.js

module.exports = routerExcursiones;