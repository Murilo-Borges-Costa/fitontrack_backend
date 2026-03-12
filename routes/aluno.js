import { Router } from 'express';
import { atualizarAluno, mostrarAlunos, criarAlunos, deletarAluno } from '../controllers/AlunoController.js';
const router = Router()

// Rota de criação
router.post('/cadastro/aluno', criarAlunos)

// Rota de Delete
router.delete('/delete/:id/aluno', deletarAluno)

// Rota de Atualização
router.patch('/atualizar/:id/aluno', atualizarAluno)

// Rota de leitura
router.get('/aluno', mostrarAlunos)

export default router