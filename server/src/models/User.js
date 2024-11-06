const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database/database')

// class Users extends Model {}
// Users.init({ 
//     id: { 
//         type: DataTypes.INTEGER, 
//         primaryKey: true, 
//         autoIncrement: true,
//     },
//     dni:{
//         type: DataTypes.STRING, 
//         unique: true,
//     },
//     nombre: { 
//         type: DataTypes.STRING, 
//         allowNull: false,
//     }, 
//     apellidos: { 
//         type: DataTypes.STRING, 
//         allowNull: false,
//     },
//     email: { 
//         type: DataTypes.STRING, 
//         allowNull: false,
//     },
//     password: { 
//         type: DataTypes.STRING, 
//         allowNull: false,
//     },
//     isAdminUser: {               // Cambiado de "role" a "isAdminUser"
//         type: DataTypes.BOOLEAN,  // Cambiado de STRING a BOOLEAN
//         defaultValue: false,      // Asignar valor por defecto si no se define
//     },
//     fecha_nacimiento: DataTypes.DATE, 
//     telefono: DataTypes.NUMBER,
//     direccion: DataTypes.STRING,
//     altura: DataTypes.STRING,
//     peso: DataTypes.STRING,
//     deporte: DataTypes.STRING,
//     mejor_marca: DataTypes.STRING,
//     profile_complete: DataTypes.BOOLEAN,
// }, {
//     sequelize,
//     modelName: "users",
//     timestamps: false
// })
// module.exports = Users;

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
    isAdminUser: {               
        type: DataTypes.BOOLEAN,  
        defaultValue: false,      
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,  // Cambié NUMBER a STRING para evitar problemas de formato
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
