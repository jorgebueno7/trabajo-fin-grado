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
    resultado: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    posicion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: "ranking",
    timestamps: false,
});

module.exports = Ranking;