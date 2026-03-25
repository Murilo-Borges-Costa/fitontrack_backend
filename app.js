import express from 'express';
import cors from 'cors';

// IMPORTAR RELACIONAMENTOS
import './models/associations.js';

// ROTAS
import alunoRoutes from './routes/aluno.js';
import personalRoutes from './routes/personal.js';
import exercicioRoutes from './routes/exercicio.js';
import treinoRoutes from './routes/treino.js';
import avaliacaoRoutes from './routes/avaliacao.js';
import treinoExercicioRoutes from './routes/treinoExercicio.js';
import execucaoRoutes from './routes/execucao.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// ROTAS
app.use(alunoRoutes);
app.use(personalRoutes);
app.use(exercicioRoutes);
app.use(treinoRoutes);
app.use(avaliacaoRoutes);
app.use(treinoExercicioRoutes);
app.use(execucaoRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});