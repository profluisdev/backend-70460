import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import envsConfig from "../../../../clase-11/e-commerce/src/config/envs.config.js";
import { userServices } from "../../services/user.services.js";

// Función que extrae el token de la cookie
const cookieExtractor = (req) => {
  let token = null;
  // Validamos si existe la request y la cookie
  if (req && req.cookies) {
    token = req.cookies.token;
  }

  return token;
};

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
  secretOrKey: envsConfig.JWT_SECRET,
};

const jwtStrategy = new Strategy(options,
  async (payload, done) => {
    try {
      if(payload){
        const user = await userServices.findOne({email: payload.email});
        if(!user) return done(null, false, {message: "Usuario no encontrado"});
        return done(null, user);
      }

      
    } catch (error) {
      done(error);
    }
  }
)

passport.use("jwt", jwtStrategy);