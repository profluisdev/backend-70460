import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import envsConfig from "../envs.config.js";
import { userDao } from "../../persistence/mongo/dao/user.dao.js";

// Función que extrae el token de la cookie
const cookieExtractor = (req) => {
  let token = null;
  // Validamos si existe la request y la cookie
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  
  return token;
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]), // Configuramos de donde extraemos el token (cookies o headers)
  secretOrKey: envsConfig.JWT_SECRET, // Valida si la firma del token es válida
};

const jwtStrategy = new Strategy(jwtOptions, async (payload, done) => {
  try {
    
    if (payload) {
      const user = await userDao.getOne({ email: payload.email });
      return done(null, user);
    }

    return done(null, false);
  } catch (error) {
    done(error);
  }
});

passport.use("jwt", jwtStrategy);
