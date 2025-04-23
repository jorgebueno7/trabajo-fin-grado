const Event = require('./Event');
const User = require('./User');
const UserEvent = require('./UserEvent');
const Ranking = require('./Ranking');
const Sport = require('./Sports');

UserEvent.belongsTo(Event, { foreignKey: 'id_evento' });
UserEvent.belongsTo(User, { foreignKey: 'id_usuario' });

Event.hasMany(UserEvent, { foreignKey: 'id_evento' });

Ranking.belongsTo(Event, { foreignKey: 'id_evento' });
Ranking.belongsTo(Sport, { foreignKey: 'id_deporte' });
Ranking.belongsTo(User, { foreignKey: 'id_usuario' });