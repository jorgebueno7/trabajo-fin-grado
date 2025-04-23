const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewController');

router.get('/news', newsController.getAllNews);
router.get('/news/:id_noticia', newsController.getNewById);
router.post('/news', newsController.postNew);
router.put('/news/:id_noticia', newsController.putNew);
router.delete('/news/:id_noticia', newsController.deleteNew);

module.exports = router;
