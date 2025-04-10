import { userDao } from "../persistence/mongo/dao/user.dao.js";

export const userExist = async (req, res, next) => {
  const user = await userDao.getOne( { _id: req.params.id } );
  if(!user) return res.status(404).json({ status: "error", message: "User not found"});

  next();
}