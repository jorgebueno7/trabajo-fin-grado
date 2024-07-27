const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");

class Sports extends Model {}
Sports.init({
    id_deporte: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    informacion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    equipamiento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "sports",
    timestamps: false,
});

module.exports = Sports;
