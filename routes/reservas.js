const express = require("express") // Importamos express
const conexion = require("../conexion") // Importamos conexion (la bd)

const routerReservas = express.Router() // declaramos la ruta routerReservas. En app dijimos que es /api/reservas


routerReservas.post("/", (req, res) => { // Solicitud POST a la direccion / de routerReservas
// Queda "http://localhost:3202/api/reservas/"

    const nombre = req.body.nombre; // Creamos una constante "nombre" que contiene el valor obtenido desde el frontend
    const apellido = req.body.apellido; // Idem "apellido"
    const correo_electronico = req.body.correo_electronico; // Idem "correo_electronico"
    const telefono = req.body.telefono; // Idem "telefono"
    const id_excursion = req.body.id_excursion; // Idem "id_excursion"
    const disponibles = req.body.disponibles; // Idem "disponibles"

    // Le pedimos a la bd que inserte en la tabla reservas los valores declarados anteriormente
    conexion.query("INSERT INTO reservas (nombre, apellido, correo_electronico, telefono, id_excursion, disponibles) VALUES (?, ?, ?, ?, ?, ?)", [nombre, apellido, correo_electronico, telefono, id_excursion, disponibles], (err, result) => {
        
        // Si hay errores....
        if(err) {
            console.log(err); // Muestra en consola el error
        } 
        
        // Si no hay errores....
        else {
            res.send(result); // Inserta los datos en la bd
        }
    })

})

module.exports = routerReservas; // Permite que podamos usar routerReservas en los demas archivos.



    