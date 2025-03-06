import express from "express";
import { connectMongoDB } from "./config/mongoDB.config.js";
import routes from "./routes/index.js";

const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Rutas de la api
app.use("/api", routes);

// Ruta para manejar errores 404
app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
