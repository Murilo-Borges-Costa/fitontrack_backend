import { Router } from 'express';
import { criarPersonal, deletarPersonal, atualizarPersonal, mostrarPersonals } from '../controllers/personalControler.js';
const router = Router()

// Rota de criação
router.post('/cadastro/personal', criarPersonal)

// Rota de Delete
router.delete('/delete/:id/personal', deletarPersonal)

// Rota de Atualização
router.patch('/atualizar/:id/personal', atualizarPersonal);

// Rota de leitura
router.get('/personal', mostrarPersonals)

export default router