import { Router } from "express";
import { create, getOne, list, remove, update } from "../controllers/categories";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router();

router.post("/category", checkAuth, create);
router.get("/category", checkAuth, list);
router.get("/category/:id", checkAuth, getOne);
router.delete("/category/:id", checkAuth, remove);
router.put("/category/:id", checkAuth, update);

export default router;