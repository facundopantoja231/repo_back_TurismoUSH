// importacion de express y de conexión.js (la base de datos de turismo ushuaia)

const express = require("express")
const conexion = require("../conexion")

// importacion del router Usuarios

const routerRestaurants = express.Router()

routerRestaurants.get("/", (req, res) => {
  
    conexion.query("SELECT * FROM restaurantes", (err, result) => {
      if (err) {
        console.error("Error al obtener datos de restaurantes:", err);
        res.status(500).json({ error: "Error al obtener datos de restaurantes" });
      } else {
        res.status(200).json(result); // Devuelve los datos de restaurantes en formato JSON
      }
    });
  });


routerRestaurants.post("/", (req, res) => { 

    const restaurante_nombre = req.body.restaurante_nombre;
    const descripcion = req.body.descripcion;
    const direccion = req.body.direccion;
    const urlImagen = req.body.urlImagen;

    conexion.query("INSERT INTO restaurantes (restaurante_nombre, descripcion, direccion, urlImagen) VALUES (?, ?, ?, ?)", [restaurante_nombre, descripcion, direccion, urlImagen], (err, result) => {
        if(result) {
            res.send(result);
        }else{
            res.send({message: "Ingresa los registros faltantes!"})
        }
    })


})



// exportamos routersRestaurants para mostrarlo y ejecutarlo desde app.js

module.exports = routerRestaurants;