const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Event = require('./Event');
const User = require('./User');

class UserEvent extends Model {}
UserEvent.init({
    id_evento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // references: {
        //   model: Event,
        //   key: 'id_evento'
        // }
        allowNull: false
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // references: {
        //   model: User,
        //   key: 'id_usuario'
        // }
        allowNull: false
      },
      esta_inscrito: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      notificar_union: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      clasificacion: { type: DataTypes.NUMBER, allowNull: true },
      puntos: { type: DataTypes.INTEGER, allowNull: true },
      tiempo: { type: DataTypes.FLOAT, allowNull: true },
      resultado: { type: DataTypes.STRING, allowNull: true },
      observaciones: { type: DataTypes.STRING, allowNull: true },
      estadisticas_extra: { type: DataTypes.JSON, allowNull: true },
}, {
    sequelize,
    tableName: "user_events",
    timestamps: false,
});

UserEvent.belongsTo(Event, { foreignKey: 'id_evento' });
UserEvent.belongsTo(User, { foreignKey: 'id_usuario' });

module.exports = UserEvent;