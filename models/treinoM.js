import { DataTypes } from "sequelize";
import { sequelize } from "./banco.js";

// Criar tabela
export const Treino = sequelize.define('treinos', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    personal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'personals',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
    },
});

// Forçar a criação do treino
Treino.sync({ force: false });