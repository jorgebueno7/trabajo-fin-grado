const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewController');
const verifySession = require('../middleware/verify-sessions');
const upload = require('../middleware/upload');

router.get('/news/:id_noticia/imagen', newsController.getNewImage);
router.get('/news', newsController.getAllNews);
router.get('/news/:id_noticia', newsController.getNewById);
router.post('/news', upload.single('imagen'), verifySession, newsController.postNew);
router.put('/news/:id_noticia', newsController.putNew);
router.delete('/news/:id_noticia', newsController.deleteNew);

module.exports = router;
