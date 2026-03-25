import { Router } from "express";
import * as controller from "../controllers/alunoController.js";

const router = Router();

router.get("/alunos", controller.listar);
router.get("/alunos/:id", controller.buscarPorId);
router.post("/alunos", controller.criar);
router.patch("/alunos/:id", controller.atualizar);
router.delete("/alunos/:id", controller.deletar);
router.post("/auth/aluno", controller.login);

export default router;

// import { Router } from 'express';
// import {
//     atualizarAluno,
//     mostrarAlunos,
//     criarAlunos,
//     deletarAluno,
//     loginAluno,
//     buscarAlunoPorId
// } from '../controllers/AlunoController.js';

// const router = Router();

// // CRUD
// router.post('/alunos', criarAlunos);
// router.get('/alunos', mostrarAlunos);
// router.get('/alunos/:id', buscarAlunoPorId);
// router.patch('/alunos/:id', atualizarAluno);
// router.delete('/alunos/:id', deletarAluno);

// // LOGIN
// router.post('/auth/aluno', loginAluno);

// export default router;