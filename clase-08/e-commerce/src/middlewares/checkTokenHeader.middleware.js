import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { verifyToken } from "../utils/jwt.js";

export const checkTokenHeader = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No se provee un token" });

    const token = authHeader.split(" ")[1];

    // Decodificar el token
    const decoded = verifyToken(token);
    const user = await userDao.getOne({ _id: decoded._id });
    if(!user) return res.status(401).json({ message: "Usuario no encontrado"});

    // Agregamos a la request el usuario
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};
