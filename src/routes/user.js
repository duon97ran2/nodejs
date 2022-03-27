import { Router } from "express";
import { list, remove } from "../controllers/user";

const router = Router();

router.get("/users", list);
router.delete("/users/:id", remove);

export default router;