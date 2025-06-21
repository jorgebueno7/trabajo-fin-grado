const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database/database')

class Users extends Model {}
Users.init({ 
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true,
    },
    dni: {
        type: DataTypes.STRING, 
        unique: true,
        allowNull: false,
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
        validate: {
            isEmail: true,
        },
    },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING, 
        allowNull: false,
        defaultValue: 'participante',
    },
    isAdminUser: {               
        type: DataTypes.BOOLEAN,  
        defaultValue: false,      
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
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
    profile_complete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: "users",
    timestamps: false
});

module.exports = Users;
