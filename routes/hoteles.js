// importacion de express y de conexión.js (la base de datos de turismo ushuaia)

const express = require("express")
const conexion = require("../conexion")

// importacion del router hoteles

const routerHoteles = express.Router()

routerHoteles.get("/", (req, res) => {
  
    conexion.query("SELECT * FROM hoteles", (err, result) => {
      if (err) {
        console.error("Error al obtener datos de restaurantes:", err);
        res.status(500).json({ error: "Error al obtener datos de restaurantes" });
      } else {
        res.status(200).json(result); // Devuelve los datos de hoteles en formato JSON
      }
    });
  });

routerHoteles.post("/", (req, res) => { 

    const nombre_hotel= req.body.nombre_hotel;
    const descripcion_hotel = req.body.descripcion_hotel;
    const direccion_hotel = req.body.direccion_hotel;
    const url_hotel = req.body.url_hotel;
    const telefono_hotel = req.body.telefono_hotel;

    conexion.query("INSERT INTO hoteles (nombre_hotel, descripcion_hotel, direccion_hotel, url_hotel, telefono_hotel) VALUES (?, ?, ?, ?,?)", [nombre_hotel, descripcion_hotel, direccion_hotel, url_hotel,telefono_hotel], (err, result) => {
        if(result) {
            res.send(result);
        }else{
            res.send({message: "Ingresa los registros faltantes!"})
        }
    })


})



// exportamos routersHoteles para mostrarlo y ejecutarlo desde app.js

module.exports = routerHoteles;