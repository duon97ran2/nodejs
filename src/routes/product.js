import { Router } from "express";
import { create, getOne, list, remove, update } from "../controllers/product.js";
import { checkAuth } from "../middlewares/checkAuth.js";


const router = Router();


router.get("/products",checkAuth,list);
router.get("/products/:id",checkAuth,getOne);
router.delete("/products/:id",checkAuth,remove);
router.put("/products/:id",checkAuth,update);
router.post("/products",checkAuth,create);

export default router;