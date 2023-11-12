// importacion de express y de conexión.js (la base de datos de turismo ushuaia)

const express = require("express")
const conexion = require("../conexion")

// importacion del router Usuarios

const routerReservas = express.Router()

// Enviar reserva 

routerReservas.post("/", (req, res) => { 

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo_electronico = req.body.correo_electronico;
    const telefono = req.body.telefono;
    const id_excursion = req.body.id_excursion;

    conexion.query("INSERT INTO reservas (nombre, apellido, correo_electronico, telefono, id_excursion) VALUES (?, ?, ?, ?, ?)", [nombre, apellido, correo_electronico, telefono, id_excursion], (err, result) => {
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

// exportamos routersRestaurants para mostrarlo y ejecutarlo desde app.js

module.exports = routerReservas;



    