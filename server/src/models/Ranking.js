const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Event = require('./Event');
const User = require('./User');
const Sports = require('./Sports');

class Ranking extends Model {}
Ranking.init({
    id_ranking: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_usuario',
        },
    },
    id_deporte: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sports,
            key: 'id_deporte',
        },
    },
    id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Event,
            key: 'id_evento',
        },
    }, 
    clasificacion: { type: DataTypes.NUMBER, allowNull: true },
    puntos: { type: DataTypes.INTEGER, allowNull: true },
    tiempo: { type: DataTypes.FLOAT, allowNull: true },
    resultado: { type: DataTypes.STRING, allowNull: true },
    observaciones: { type: DataTypes.STRING, allowNull: true },
    estadisticas_extra: { type: DataTypes.JSON, allowNull: true },
}, {
    sequelize,
    tableName: "ranking",
    timestamps: false,
});

module.exports = Ranking;