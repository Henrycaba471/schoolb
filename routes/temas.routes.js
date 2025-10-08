const express = require('express');
const router = express.Router();
const temaController = require('../controllers/temaController');
const verifyAuth = require('../middleware/auth');

router.post('/save-tema', verifyAuth.checkAuth, temaController.saveTema);
router.get('/materia-seleccionada/:subject', verifyAuth.checkAuth, temaController.temaPerSubject);
router.put('/actualizar-tema/:id', verifyAuth.checkAuth, temaController.actualizarTema);


module.exports = router;