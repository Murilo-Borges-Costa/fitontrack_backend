import { Router } from 'express';
import { criarAvaliacao, listarAvaliacoes, atualizarAvaliacoes } from '../controllers/AvaliacaoController.js';

const router = Router();

// Rota para criar avaliação (POST /avaliacao)
router.post('/avaliacao/criar', criarAvaliacao);

// Rota para listar avaliações de um avaliado (GET /avaliacao/:id_avaliado)
router.get('/:id/avaliado/buscar', listarAvaliacoes);

router.patch('/:id/atualizar/avaliacoes', atualizarAvaliacoes);

export default router;
