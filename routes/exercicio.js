import { Router } from 'express';
import {
  createExercicio,
  getExercicios,
  getExercicioById,
  updateExercicio,
  deleteExercicio,
} from '../controllers/exercicioController.js';

const router = Router();

router.post('/exercicios', createExercicio);
router.get('/exercicios', getExercicios);
router.get('/exercicios/:id', getExercicioById);
router.patch('/exercicios/:id', updateExercicio);
router.delete('/exercicios/:id', deleteExercicio);

export default router;
