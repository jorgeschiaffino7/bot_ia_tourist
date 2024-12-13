const express = require('express');
const router = express.Router();
const attractionController = require('../controllers/attractionController');

router.post('/', attractionController.createAttraction);
router.get('/', attractionController.getAllAttractions);

module.exports = router;