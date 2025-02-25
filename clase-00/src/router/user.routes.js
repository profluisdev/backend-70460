import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { userExist } from "../middlewares/existUser.middleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userDao.getAll();
    res.status(200).json({ status: "ok", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await userDao.create(req.body);
    res.status(201).json({ status: "ok", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.get("/:id", userExist, async (req, res) => {
  try {
    const user = await userDao.getOne({_id: req.params.id})
    res.status(200).json({ status: "ok", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.delete("/:id", userExist, async (req, res) => {
  try {
    await userDao.remove(req.params.id);
    res.status(200).json({ status: "ok", message: `User id ${req.params.id} remove` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.put("/:id", userExist, async (req, res) => {
  try {
    const userUpdate = await userDao.update(req.params.id, req.body);
    res.status(200).json({ status: "ok", userUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

export default router;
