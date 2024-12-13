const Attraction = require('../models/Attraction');
const { Client } = require('@googlemaps/google-maps-services-js');
const client = new Client({});


// Controlador para crear un nuevo atractivo
exports.createAttraction = async (req, res) => { 
  try {
    const { name, latitude, longitude } = req.body;

    // Validación simple de datos
    if (!name || !latitude || !longitude) {
      return res.status(400).json({ message: 'Todos los campos (nombre, latitud, longitud) son obligatorios' });
    }

    const attraction = new Attraction({ name, latitude, longitude });
    await attraction.save();

    res.status(201).json({ message: 'Atractivo creado exitosamente', attraction });
  } catch (error) {
    console.error('Error al crear el atractivo:', error);
    res.status(500).json({ message: 'Error al crear el atractivo', error });
  }
};

// Controlador para obtener todos los atractivos
exports.getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find();

    if (!attractions.length) {
      return res.status(404).json({ message: 'No se encontraron atractivos' });
    }

    res.status(200).json(attractions);
  } catch (error) {
    console.error('Error al obtener los atractivos:', error);
    res.status(500).json({ message: 'Error al obtener los atractivos', error });
  }
};
