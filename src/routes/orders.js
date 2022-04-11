import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orders";
import { isAdmin, isAuth, isExist } from "../middlewares/Authenticate";

const router = Router();

router.post("/orders", isAuth, isExist, createOrder);
router.get("/orders", isAuth, isExist, isAdmin, getOrders);

export default router;