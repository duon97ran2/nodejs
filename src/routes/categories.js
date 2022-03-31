import { Router } from "express";
import { create, getOne, list, remove, update } from "../controllers/categories";
import { isAdmin, isAuth, isExist } from "../middlewares/Authenticate";


const router = Router();

router.post("/category", isAuth, isExist, isAdmin, create);
router.get("/category", list);
router.get("/category/:id", getOne);
router.delete("/category/:id", isAuth, isExist, isAdmin, remove);
router.put("/category/:id", isAuth, isExist, isAdmin, update);

export default router;