const event = require('../models/Event');
const news = require('../models/News');

const getAllNews = async (req, res) => {
    try {
        const newsList = await news.findAll({
            include: [{ model: event }]
        });
        res.status(200).json(newsList);
    } catch (error) {
        res.status(500).json({ error: `ERROR_GET_ALL_NEWS: ${error}` });
    }
}

const getNewById = async (req, res) => {
    try {
        const { id_noticia } = req.params;
        const noticia = await news.findByPk(id_noticia);
        if (noticia) {
            res.status(200).json(noticia);
        } else {
            res.status(404).json({ error: 'News with that id does not exist' });
        }
    } catch (error) {
        res.status(500).json({ error: `ERROR_GET_NEW_BY_ID: ${error}` });
    }
}

const postNew = async (req, res) => {
    try {
        const { id_evento, titulo, subtitulo, imagen } = req.body;
        const newNoticia = await news.create({ id_evento, titulo, subtitulo, imagen });
        res.status(201).json(newNoticia);
    } catch (error) {
        res.status(500).json({ error: `ERROR_POST_NEW: ${error}` });
    }
}

const putNew = async (req, res) => {
    try {
        const { id_noticia } = req.params;
        const { id_evento, titulo, subtitulo, imagen } = req.body;
        const [updated] = await news.update({ id_evento, titulo, subtitulo, imagen }, {
            where: { id_noticia }
        });
        if (updated) {
            const updatedNoticia = await news.findByPk(id_noticia);
            res.status(200).json(updatedNoticia);
        } else {
            res.status(404).json({ error: 'News with that id does not exist' });
        }
    } catch (error) {
        res.status(500).json({ error: `ERROR_PUT_NEW: ${error}` });
    }
}

const deleteNew = async (req, res) => {
    try {
        const { id_noticia } = req.params;
        const deleted = await news.destroy({
            where: { id_noticia }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'News with that id does not exist' });
        }
    } catch (error) {
        res.status(500).json({ error: `ERROR_DELETE_NEW: ${error}` });
    }
}

module.exports = { getAllNews, getNewById, postNew, putNew, deleteNew }