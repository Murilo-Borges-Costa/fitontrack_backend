import { Router } from "express";
import * as controller from "../controllers/personalController.js";

const router = Router();

router.get("/personais", controller.listar);
router.post("/personais", controller.criar);
router.patch("/personais/:id", controller.atualizar);
router.delete("/personais/:id", controller.deletar);
router.post("/auth/personal", controller.login);

export default router;


// import { Router } from 'express';
// import {
//     criarPersonal,
//     deletarPersonal,
//     atualizarPersonal,
//     mostrarPersonais,
//     loginPersonal,
//     buscarPersonalPorId
// } from '../controllers/personalControler.js';

// const router = Router();

// // CRUD
// router.post('/personais', criarPersonal);
// router.get('/personais', mostrarPersonais);
// router.get('/personais/:id', buscarPersonalPorId);
// router.patch('/personais/:id', atualizarPersonal);
// router.delete('/personais/:id', deletarPersonal);

// // LOGIN
// router.post('/auth/personal', loginPersonal);

// export default router;