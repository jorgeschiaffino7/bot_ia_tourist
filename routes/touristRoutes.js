const express = require('express');
const router = express.Router();
const turistaController = require('../controllers/touristController');
const { createTouristValidator } = require('../validators/Tourist');

router.post('/', createTouristValidator, turistaController.createTurista);
router.get('/', turistaController.getTuristas);
router.get('/:id', turistaController.getTuristaById);
router.put('/:id', turistaController.updateTurista);
router.delete('/:id', turistaController.deleteTurista);


module.exports = router;
