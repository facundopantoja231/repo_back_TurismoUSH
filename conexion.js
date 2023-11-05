// importación de mySQL

const mysql = require("mysql");

// conexión a la base de datos

const conexion = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "turismo_ush"
})

conexion.connect();

// habilitar exportacion de archivo

module.exports = conexion;