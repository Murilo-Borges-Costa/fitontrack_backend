import { DataTypes } from "sequelize";
import { sequelize } from "./banco.js";

// Criar tabela
export const Treino = sequelize.define('treinos', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    repeticoes: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    descanso: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Forçar a criação do treino
Treino.sync({force: false})