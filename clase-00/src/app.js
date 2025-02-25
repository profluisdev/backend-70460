import express from "express";
import { connectMongoDB } from "./config/mongodb.config.js";
import router from "./router/router.js";

const app = express();

// Conexión con la base de datos
connectMongoDB();

// Middlewares incorporados de Express
app.use(express.json()); // Formatea los cuerpos json de peticiones entrantes.
app.use(express.urlencoded({ extended: true })); // Formatea query params de URLs para peticiones entrantes.

//Rutas
app.use("/api", router);

app.listen(8080, () => {
  console.log("Server on port 8080");
});
