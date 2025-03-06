
export const authRole = (roles) => {
  
  return (req, res, next) => {
    try {
     
      if(!req.session.user) return res.status(400).json({ status: "error", msg:"No autenticado"});
      if(!roles.includes(req.session.user.role)) return res.status(403).json({status: "error", msg: "No tiene permiso"});

      next();
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  }
}