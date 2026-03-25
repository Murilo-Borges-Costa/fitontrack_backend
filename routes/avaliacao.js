import { Router } from "express";
import * as controller from "../controllers/AvaliacaoController.js";

const router = Router();

router.get("/avaliacoes", controller.listar);
router.post("/avaliacoes", controller.criar);

export default router;