// importacion de express y de conexión.js (la base de datos de turismo ushuaia)

const express = require("express")
const conexion = require("../conexion")

// importacion del router Usuarios

const routerExcursiones = express.Router()

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
        if(result) {
            res.send(result);
        }else{
            res.send({message: "Ingresa los registros faltantes!"})
        }
    })


})



// exportamos routersExcursiones para mostrarlo y ejecutarlo desde app.js

module.exports = routerExcursiones;