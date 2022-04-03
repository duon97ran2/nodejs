import { Router } from "express";
import { createUser, getUserById, list, remove, updateUser } from "../controllers/user";
import { isAdmin, isAuth, isExist } from "../middlewares/Authenticate";

const router = Router();

router.get("/users", isAuth, isExist, isAdmin, list);
router.post("/users", isAuth, isExist, isAdmin, createUser);
router.get("/users/:id", isAuth, isExist, getUserById);
router.put("/users/:id", isAuth, isExist, isAdmin, updateUser);
router.delete("/users/:id", isAuth, isExist, isAdmin, remove);

export default router;