import { Router } from "express";
import { addToCart, getCart, removeCartProduct } from "../controllers/cart";
import { isAuth, isExist } from "../middlewares/Authenticate";

const router = Router();

router.get("/cart/:id", isAuth, isExist, getCart);
router.post("/cart", isAuth, isExist, addToCart);
router.put("/cart/:actionId", isAuth, isExist, removeCartProduct);

export default router;