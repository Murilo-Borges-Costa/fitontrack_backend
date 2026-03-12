import { DataTypes } from "sequelize";
import { sequelize } from "./banco.js";

// Criar tabela
export const Aluno = sequelize.define('alunos', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    genero: {
        type: DataTypes.ENUM('Feminino', 'Masculino'),
        allowNull: false,
    },
    objetivo: {
        type: DataTypes.ENUM('Emagrecer', 'Ganhar massa', 'Manter a saúde'),
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Forçar a criação do aluno
Aluno.sync({force: false})