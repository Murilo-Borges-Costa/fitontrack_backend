import { Router } from "express";
import * as controller from "../controllers/treinoController.js";

const router = Router();

router.get("/treinos", controller.listar);
router.post("/treinos", controller.criar);
router.delete("/treinos/:id", controller.deletar);

export default router;