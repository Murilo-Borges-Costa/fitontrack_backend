import { Personal } from './personalM.js';
import { Aluno } from './alunoM.js';
import { Treino } from './treinoM.js';
import { Exercicio } from './exercicioM.js';
import { TreinoExercicio } from './treinoExercicioM.js';

// Associações entre Personal e Treino
Personal.hasMany(Treino, { foreignKey: 'personal_id', as: 'treinos' });
Treino.belongsTo(Personal, { foreignKey: 'personal_id', as: 'personal' });

// Associações muitos-para-muitos entre Treino e Exercicio
Treino.belongsToMany(Exercicio, {
    through: TreinoExercicio,
    foreignKey: 'treino_id',
    otherKey: 'exercicio_id',
    as: 'exercicios',
});
Exercicio.belongsToMany(Treino, {
    through: TreinoExercicio,
    foreignKey: 'exercicio_id',
    otherKey: 'treino_id',
    as: 'treinos',
});

// Associações entre Aluno e Treino (muitos-para-muitos via treino_exercicios)
// through: TreinoExercicio
Aluno.belongsToMany(Treino, {
    through: 'treino_exercicios',
    foreignKey: 'aluno_id',
    otherKey: 'treino_id',
    as: 'treinos',
});

Treino.belongsToMany(Aluno, {
    through: 'treino_exercicios',
    foreignKey: 'treino_id',
    otherKey: 'aluno_id',
    as: 'alunos',
});

// (Opcional) e.g. garantir criação das tabelas com associações configuradas
// import { sequelize } from './banco.js';
// await sequelize.sync({ force: false });

export { Personal, Treino, Exercicio, TreinoExercicio, Aluno };
