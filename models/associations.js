import { Aluno } from "./alunoM.js";
import { Personal } from "./personalM.js";
import { Treino } from "./treinoM.js";
import { TreinoExercicio } from "./treinoExercicioM.js";
import { Exercicio } from "./exercicioM.js";
import { Avaliacao } from "./avaliacaoM.js";

// Aluno → Treinos
Aluno.hasMany(Treino, { foreignKey: "aluno_id" });
Treino.belongsTo(Aluno, { foreignKey: "aluno_id" });

// Personal → Treinos
Personal.hasMany(Treino, { foreignKey: "personal_id" });
Treino.belongsTo(Personal, { foreignKey: "personal_id" });

// Treino ↔ Exercícios
Treino.belongsToMany(Exercicio, {
    through: TreinoExercicio,
    foreignKey: "treino_id"
});

Exercicio.belongsToMany(Treino, {
    through: TreinoExercicio,
    foreignKey: "exercicio_id"
});

// Avaliações
Aluno.hasMany(Avaliacao, { foreignKey: "aluno_id" });
Personal.hasMany(Avaliacao, { foreignKey: "personal_id" });

Avaliacao.belongsTo(Aluno, { foreignKey: "aluno_id" });
Avaliacao.belongsTo(Personal, { foreignKey: "personal_id" });