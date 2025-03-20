import passport from "passport";

export const passportCall = (strategy) => {
  return (req, res, next) => {
    
    passport.authenticate(strategy, (err, user, info) => {
      // Validamos si existe un error
      if(err) return next(err);
      // Validamos si existe el usuario
      if(!user) return res.status(401).json({ status: "error", msg: info.message});

      // Si todo sale bien 
      req.user = user;
      next();
    })(req, res, next)

  }
}