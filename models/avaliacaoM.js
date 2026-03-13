import { DataTypes } from "sequelize";
import { sequelize } from "./banco.js";
// import { Aluno } from "./alunoM.js";
// import { Personal } from "./personalM.js";

// Criar tabela de avaliações
export const Avaliacao = sequelize.define('avaliacoes', {
    id_avaliador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'alunos', // ou 'personals', mas usaremos associações
            key: 'id'
        }
    },
    id_avaliado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'personals', // ou 'alunos'
            key: 'id'
        }
    },
    tipo_avaliador: {
        type: DataTypes.ENUM('aluno', 'personal'),
        allowNull: false,
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
});

// Forçar a criação do personal
Avaliacao.sync({ force: false })