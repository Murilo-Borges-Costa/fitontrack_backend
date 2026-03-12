import express from 'express';
import cors from 'cors';
// import alunoRoutes from './routes/aluno.js';
import treinoRoutes from './routes/treino.js'; 
import alunoRoutes from './routes/aluno.js'; 
import personalRoutes from './routes/personal.js'; 

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.use(alunoRoutes);
app.use(treinoRoutes);
app.use(alunoRoutes);
app.use(personalRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});