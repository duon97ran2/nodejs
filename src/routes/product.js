import { Router } from "express";
import { create, getOne, list, remove, update } from "../controllers/product.js";
import { getUserById } from "../controllers/user.js";
import { checkAuth, isAdmin, isAuth, requiredSignin } from "../middlewares/checkAuth.js";


const router = Router();


router.get("/products", checkAuth, list);
router.get("/products/:id", checkAuth, getOne);
router.delete("/products/:id", checkAuth, remove);
router.put("/products/:id", checkAuth, update);
router.post("/products", create);

router.param("userId", getUserById)
module.exports = router;