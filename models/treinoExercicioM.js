import { DataTypes } from "sequelize";
import { sequelize } from "./banco.js";

export const TreinoExercicio = sequelize.define('treino_exercicios', {
    repeticoes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    descanso: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ordem: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    series: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    carga: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    aluno_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    treino_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    timestamps: false,
});

// TreinoExercicio.sync({ force: false });


// import { DataTypes } from "sequelize";
// import { sequelize } from "./banco.js";

// export const TreinoExercicio = sequelize.define('treino_exercicios', {
//     treino_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     exercicio_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     repeticoes: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     descanso: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     ordem: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     series: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//     },
//     carga: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
// }, {
//     timestamps: false,
// });

// // 🔥 recria a tabela corretamente
TreinoExercicio.sync({ force: false });