const { error } = require("console");
const { Pool } = require("pg");

const config = {
  //host: "44.203.195.203",
  host: "ec2-18-189-22-15.us-east-2.compute.amazonaws.com",
  user: "mau",
  password: "123",
  port: 5432,
  database: "mau_db",
};

const pool = new Pool(config);
//SENTENCIAS DE POSTGRESQL
// Necesitamos agregar un puerto de entrada "Acceso"
const PORT = process.env.PORT || 8080;
// Aquí agregaremos las librerias a utilizar "las invocamos"
const express = require("express"); // la palabra require lo unico que hace es requerir la libreria
// como la variable express es una libreria la creo como una clase para poder utlizar sus metodos y funciones
const app = express();
var cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* ESTA PARTE ES DONDE LE DAMOS AUTORIZACION A TODOS LOS CRUDS CON CORS */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/", cors(), async (req, res) => {
  try {
    const users = await pool.query("select * from libros; ");
    res.json(users.rows);
  } catch (error) {
    console.log("ERROR ", error);
  }
});

app.listen(PORT, () => console.log("servidor activo: " + PORT));
