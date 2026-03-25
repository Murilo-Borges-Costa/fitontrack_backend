import { DataTypes } from "sequelize";
import { sequelize } from "./banco.js";

export const Avaliacao = sequelize.define('avaliacoes', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    aluno_id: { type: DataTypes.INTEGER },
    personal_id: { type: DataTypes.INTEGER },

    avaliador_tipo: { type: DataTypes.ENUM('aluno', 'personal') },
    avaliador_id: { type: DataTypes.INTEGER },

    nota: { type: DataTypes.INTEGER },
    comentario: { type: DataTypes.TEXT }

}, {
    tableName: 'avaliacoes',
    timestamps: false,
});