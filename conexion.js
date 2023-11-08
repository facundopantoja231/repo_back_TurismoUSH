// importación de mySQL

const mysql = require("mysql");

// conexión a la base de datos

const conexion = mysql.createConnection({
    user: "carrascos",
    host: "ctpoba.ar",
    password: "45875420",
    database: "72_B"
})

conexion.connect();

// habilitar exportacion de archivo

module.exports = conexion;