import { Router } from "express";
import { create, fetchProductByCategory, getOne, list, ProductSearchByName, remove, update } from "../controllers/product.js";
import { isAdmin, isAuth, isExist } from "../middlewares/Authenticate";



const router = Router();


router.get("/products", list);
router.get("/products/:id", getOne);
router.delete("/products/:id", isAuth, isExist, isAdmin, remove);
router.put("/products/:id", isAuth, isExist, isAdmin, update);
router.post("/products", isAuth, isExist, isAdmin, create);
router.get("/search", ProductSearchByName);
router.get("/products/category/:categoryId", fetchProductByCategory);

export default router;