const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database/database')

class Users extends Model {}
Users.init({ 
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    dni:{
        type: DataTypes.STRING, 
        unique: true,
    },
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
    apellidos: { 
        type: DataTypes.STRING, 
        allowNull: false,
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false,
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_nacimiento: { 
        type: DataTypes.DATE, 
        allowNull: false,
    },
    telefono: {
        type: DataTypes.NUMBER, 
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    altura: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    peso: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deporte: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mejor_marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "users",
    timestamps: false
})
module.exports = Users;