import { Router } from 'express';
import {
  createTreino,
  getTreinosByPersonal,
  getTreinosByAluno,
  linkAlunoTreino,
  mostrarTreino,
  atualizarAlunoTreino,
  deleteAlunoTreino,
} from '../controllers/treinoControler.js';

const router = Router();

// post
router.post('/treinos', createTreino);
router.post('/aluno-treino', linkAlunoTreino);

// gets
router.get('/treinos/personal/:id', getTreinosByPersonal);  
router.get('/treinos/aluno/:id', getTreinosByAluno);
router.get('/treinos/buscar', mostrarTreino);

router.delete('/aluno-treino/:aluno_id/:treino_id', deleteAlunoTreino);

router.patch('/aluno-treino/:aluno_id/:treino_id', atualizarAlunoTreino);

// router.get('/aluno-treino/buscar/:id', linkAlunoTreino);
// router.delete('/aluno-treino/delete/:id', linkAlunoTreino);

export default router;