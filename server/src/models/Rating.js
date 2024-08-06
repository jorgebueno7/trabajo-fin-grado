const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Event = require('./Event');
const User = require('./User');
const Sports = require('./Sports');

class Rating extends Model {}
Rating.init({
    id_rating: {
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
    valoracion: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: "valoraciones",
    timestamps: false,
});

module.exports = Rating;