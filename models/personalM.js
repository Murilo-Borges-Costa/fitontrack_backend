import { DataTypes } from "sequelize";
import { sequelize } from "./banco.js";

// Criar tabela
export const Personal = sequelize.define('personals', {
    cref: {
        type: DataTypes.STRING,
        allowNull: false,
    },
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
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Forçar a criação do personal
Personal.sync({force: false})