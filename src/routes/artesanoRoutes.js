const express = require('express');
const router = express.Router();

const artesanoController = require('../controllers/artesanoController');

router.get('/getArtesanos', artesanoController.getArtesanos);
router.get('/getArtesanoById/:id', artesanoController.getArtesanoById);
router.post('/postArtesano', artesanoController.postArtesano);
router.put('/putArtesano/:id', artesanoController.putArtesano);
router.delete('/deleteArtesano/:id', artesanoController.deleteArtesano);

module.exports = router;
