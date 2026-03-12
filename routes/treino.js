import { Router } from 'express';
import { atualizarTreino, mostrarTreino, criarTreino, deletarTreino } from '../controllers/treinoControler.js';

const router = Router()
// Rota de criação
router.post('/cadastro/treino', criarTreino)

// Rota de Delete
router.delete('/delete/:id/treino', deletarTreino)

// Rota de Atualização
router.patch('/atualizar/:id/treino', atualizarTreino);

// Rota de leitura
router.get('/treino', mostrarTreino)

export default router