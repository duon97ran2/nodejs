import { Router } from "express";
import { createUser, getUserById, list, remove, updateUser } from "../controllers/user";
import { isAdmin, isAuth } from "../middlewares/Authenticate";

const router = Router();

router.get("/users", isAuth, isAdmin, list);
router.post("/users", isAuth, isAdmin, createUser);
router.get("/users/:id", isAuth, isAdmin, getUserById);
router.put("/users/:id", isAuth, isAdmin, updateUser);
router.delete("/users/:id", isAuth, isAdmin, remove);

export default router;