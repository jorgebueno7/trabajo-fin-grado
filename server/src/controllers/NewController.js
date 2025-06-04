const event = require('../models/Event');
const news = require('../models/News');

const getNewImage = async (req, res) => {
    try {
        const { id_noticia } = req.params;
        const noticia = await news.findByPk(id_noticia);

        if (!noticia || !noticia.imagen) {
            return res.status(404).send('Imagen no encontrada');
        }

        // O puedes detectar el tipo de imagen si lo guardas (por ahora asumimos JPEG)
        res.set('Content-Type', 'image/jpeg');
        res.send(noticia.imagen);
    } catch (error) {
        res.status(500).json({ error: `ERROR_GET_NEW_IMAGE: ${error}` });
    }
};


const getAllNews = async (req, res) => {
    try {
        const newsList = await news.findAll({
            include: [{ model: event }],
            order: [['fecha_creacion', 'DESC']] // Ordenar por fecha de creación descendente
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
        const id_usuario = req.session.userId;
        if (!id_usuario) {
            return res.status(400).json({ error: 'User is not logged in' });
        }
        const { id_evento, titulo, subtitulo } = req.body;

        const imagen = req.file ? req.file.buffer : null; // nombre del archivo

        const newNoticia = await news.create({ id_evento, titulo, subtitulo, imagen });
        res.status(201).json(newNoticia);
    } catch (error) {
        res.status(500).json({ error: `ERROR_POST_NEW: ${error}` });
    }
}

const postNewFromEvent = async (req, res) => {
    try {
        const id_usuario = req.session.userId;
        if (!id_usuario) {
            return res.status(400).json({ error: 'User is not logged in' });
        }
        const { titulo, subtitulo } = req.body;
        
        const { id_evento } = req.params; // Obtener el id_evento de los parámetros de la ruta
        const evento = await event.findByPk(id_evento);
        if (!evento) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const imagen = req.file ? req.file.buffer : null; // nombre del archivo

        const newNoticia = await news.create({ id_evento, titulo, subtitulo, imagen });
        res.status(201).json(newNoticia);
    } catch (error) {
        res.status(500).json({ error: `ERROR_POST_NEW: ${error}` });
    }
}

const putNew = async (req, res) => {
    try {
        const { id_noticia } = req.params;
        const { id_evento, titulo, subtitulo } = req.body;
    
        // Buscamos la noticia actual para recuperar la imagen si no se actualiza
        const existingNew = await news.findByPk(id_noticia);
        if (!existingNew) {
            return res.status(404).json({ error: 'News with that id does not exist' });
        }
    
        // Solo actualizar la imagen si se sube una nueva
        const imagen = req.file ? req.file.buffer : null; // nombre del archivo
    
        const updateData = { id_evento, titulo, subtitulo };
        if (imagen) {
            updateData.imagen = imagen;
        }

        await news.update(updateData, { where: { id_noticia } });
        res.status(200).json({ message: 'New updated successfully' });
    } catch (error) {
        res.status(500).json({ error: `ERROR_PUT_NEW: ${error}` });
    }
};

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

module.exports = { getNewImage, getAllNews, getNewById, postNew, putNew, deleteNew, postNewFromEvent }