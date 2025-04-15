import express from "express";
import { connectMongoDB } from "./config/mongoDB.config.js";
import routes from "./routes/router.js";
import envsConfig from "./config/envs.config.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "./config/passport/passport.config.js";
import cors from "cors";
import { sendEmail } from "./email/sendEmail.js";
import { welcomeUserTemplate } from "./email/templates/welcome.template.js";

const app = express();

connectMongoDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use(
  session({
    secret: envsConfig.SESSION_SECRET,
    resave: true, // Evita guardar la sesión si no hay cambios
    saveUninitialized: true, // Guarda sesiones vacías
    cookie: { secure: false, maxAge: 500000 }, // Debe estar en true si usas HTTPS
  })
);
app.use(cors());

app.use(cookieParser());

// Inicializar las estrategias de passport
app.use(passport.initialize());

// Rutas de la api
app.use("/api", routes);
app.use("/email", async (req, res) => {
  const template = welcomeUserTemplate("Javier");
  await sendEmail(template, "Prueba 3 email", "profeluismeradev@gmail.com");
  res.status(200).json({ msg: "Email enviado" });
});

// Ruta para manejar errores 404
app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.listen(envsConfig.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${envsConfig.PORT}`);
});
