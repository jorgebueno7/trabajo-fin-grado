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
    fecha_nacimiento: DataTypes.DATE, 
    telefono: DataTypes.NUMBER,
    direccion: DataTypes.STRING,
    altura: DataTypes.STRING,
    peso: DataTypes.STRING,
    deporte: DataTypes.STRING,
    mejor_marca: DataTypes.STRING,
}, {
    sequelize,
    modelName: "users",
    timestamps: false
})
module.exports = Users;