import { DataTypes } from "sequelize";
import { sequelize } from "./banco.js";

export const Personal = sequelize.define('personais', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    cref: { type: DataTypes.STRING, allowNull: false, unique: true },

    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha: { type: DataTypes.STRING, allowNull: false },

    genero_id: { type: DataTypes.INTEGER, allowNull: false },

    imagem: { type: DataTypes.STRING }

}, {
    tableName: 'personais',
    timestamps: false,
});

// import { DataTypes } from "sequelize";
// import { sequelize } from "./banco.js";

// export const Personal = sequelize.define('personais', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },

//     cref: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },

//     nome: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },

//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//     },

//     senha: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },

//     genero_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },

//     imagem: {
//         type: DataTypes.STRING,
//     },

//     created_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//     }

// }, {
//     tableName: 'personais',
//     timestamps: false,
// });

// // ❌ NÃO usar sync aqui