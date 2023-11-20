const mysql = require("mysql"); // Importación de mySQL

const conexion = mysql.createConnection({ // Creamos una constante que va a contener la conexión a la bd
    user: "carrascos", // User de nuestra bd
    host: "ctpoba.ar", // Host de nuestra bd
    password: "45875420", // Password de nuestra bd
    database: "72_B" // Pombre de nuestra bd
})

conexion.connect(); // Realizamos la conexión a la base de datos

module.exports = conexion; // Permite que podamos usar conexión en los demas archivos.