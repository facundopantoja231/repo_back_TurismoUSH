const mysql = require("mysql");

const conexion = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "turismo_ush"
})

conexion.connect();

module.exports = conexion;