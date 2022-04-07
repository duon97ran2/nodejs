import { Router } from "express";
import { addToCart, getCart } from "../controllers/cart";
import { isAuth, isExist } from "../middlewares/Authenticate";

const router = Router();

router.get("/cart/:id", isAuth, isExist, getCart);
router.post("/cart", isAuth, isExist, addToCart);

export default router;