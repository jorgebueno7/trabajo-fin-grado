const Event = require('./Event');
const User = require('./User');
const UserEvent = require('./UserEvent');

UserEvent.belongsTo(Event, { foreignKey: 'id_evento' });
UserEvent.belongsTo(User, { foreignKey: 'id_usuario' });

Event.hasMany(UserEvent, { foreignKey: 'id_evento' });
