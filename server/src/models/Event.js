const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Sport = require('./Sports');

class Event extends Model {}
Event.init({
    id_evento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_deporte: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sports',
          key: 'id_deporte'
        }
      },
      fecha_ini: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_limite: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      lugar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hora_ini: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      maximo_usuarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clasificacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'sin_comenzar',
      },
      id_usuario_espera: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imagen: { type: DataTypes.BLOB('long') }
}, {
    sequelize,
    tableName: "events",
    timestamps: false,
});

Event.belongsTo(Sport, { foreignKey: 'id_deporte' });

module.exports = Event;