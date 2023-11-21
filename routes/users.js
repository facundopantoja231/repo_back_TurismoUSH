const express = require("express") // Importamos express
const conexion = require("../conexion") // Importamos conexion (la bd)
const jwt = require("jsonwebtoken") // Importamos JsonWebToken para crear el token

const routerUsers = express.Router() // declaramos la ruta routerUsers. En app dijimos que es /api/users


routerUsers.get("/", (req, res) => { // Solicitud GET a la ruta principal de routerUsers

    // Le pedimos a la bd todos los registros de la tabla usuarios
    conexion.query("SELECT * FROM usuarios", (err, result) => {
        
        // Si hay un error.......
        if (err) {
            console.error(err); // Muestra en consola el error
            res.status(500).json({ error: "Error al obtener datos de usuarios" }); // Status 500 (server error)
        } 
        // Si no hay errores......
        else {
            res.status(200).json(result);  // enviamos los datos en formato JSON con status 200 (solicitud exitosa)
        }
    });
});



routerUsers.post("/register", (req, res) => { // Solicitud POST a la ruta /register de routerUsers
// Queda como "http://localhost:3202/api/users/register"

    const nombre = req.body.nombre; // Guardamos en la constante "nombre" el valor obtenido desde el frontend
    const apellido = req.body.apellido; // Idem "apellido"
    const correoElectronico = req.body.correoElectronico; // Idem "correoElectronico"
    const nombreUsuario = req.body.nombreUsuario; // Idem "nombreUsuario"
    const contraseña = req.body.contraseña; // Idem "contraseña"


    conexion.query("SELECT * FROM usuarios WHERE nombreUsuario = ?", [nombreUsuario], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            if(result.length > 0) {
                res.status(400).json({error: "El nombre de usuario ya existe"})
            } else {
                
                // Le pedimos a la bd insertar en la tabla usuarios los valores que declaramos anteriormente
                // El campo role siempre va a ser 'user'

                conexion.query("INSERT INTO usuarios (nombre, apellido, correoElectronico, nombreUsuario, contraseña, role) VALUES (?, ?, ?, ?, ?, ?)", [nombre, apellido, correoElectronico, nombreUsuario, contraseña, 'user'], (err, result) => {
        
                    // Si hubo un error al insertar los datos........
                    if(err) {
                        console.log(err); // Muestra en consola el error
                        res.status(500).json({ error: "Error al obtener datos de usuarios" }); // Status 500 (server error)
                    } 
        
                    // Si no hubo errores........
                    else {
                    res.send(result) // Enviamos los datos a la BD
                    }
                })
            }
        }
    })
    
})



routerUsers.post("/login", (req,res) => { // Solicitud POST a la ruta /login de routerUsers
// Queda como "http://localhost:3202/api/users/login"

    const nombreUsuario = req.body.nombreUsuario; // Guardamos en la constante "nombreUsuario" el valor obtenido desde el frontend
    const contraseña = req.body.contraseña; // Idem "contraseña"

    // Le pedimos a la bd que traiga todos datos si el usuario y contraseña coinciden con los que ingreso el usuario desde el frontend
    conexion.query("SELECT * FROM usuarios WHERE nombreUsuario = ? AND contraseña = ?", [nombreUsuario, contraseña], (err, result) => {
            
    // Si hay errores......
    if(err) {
        console.log(err); // Muestra en consola el error
        res.status(500).json({ error: "Error al obtener datos de usuarios" }); // Status 500 (server error)
    }
     
    // Si los valores de la bd coinciden con los del usuario.....
    if(result.length === 1) {
        const tokenValores = { // Creamos una constante tokenValores que contiene el nombreUsuario y role
            nombreUsuario: result[0].nombreUsuario,
            role: result[0].role,
        }
            const token = jwt.sign( tokenValores, "Stack", { // Creamos el token y le pasamos tokenValores
                // el token encriptara los valores nombreUsuario y role ya que son los q pasamos en tokenValores
                expiresIn: "30min" // Aclaramos que el token expirará en 30 minutos.
            })
            res.send( {token} ) // Enviamos el token como objeto
        }
        
    // Si los valores de la bd no coinciden con los del usuario.......    
    else{ 
        console.log("Error de usuario") // Mostramos en consola este mensaje
    }
    })
})

module.exports = routerUsers; // Permite que podamos usar routerUsers en los demas archivos.