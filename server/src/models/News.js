const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Event = require('./Event');

class News extends Model {}
News.init({
    id_noticia: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // id_evento: { 
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: Event,
    //         key: 'id_evento'
    //     }
    // },
    titulo: { type: DataTypes.STRING, allowNull: false },
    subtitulo: { type: DataTypes.TEXT },
    imagen: { type: DataTypes.BLOB('long') },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    sequelize,
    tableName: "news",
    timestamps: false,
});

module.exports = News;