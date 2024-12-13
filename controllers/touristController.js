/* const Turista = require('../models/Tourist');
const { Client } = require('@googlemaps/google-maps-services-js');
const Attraction = require('../models/Attraction');
//const axios = require('axios');
const client = new Client({});

exports.createTurista= async (req, res) => {
  try {
    const { email, phone, latitude, longitude } = req.body;

    // Crear y guardar el turista
    const tourist = new Turista({ email, phone, latitude, longitude });
    await tourist.save();

    // Obtener todos los atractivos para calcular la distancia
    const attractions = await Attraction.find();
    const distances = [];

    // Calcular la distancia a cada atractivo
    for (const attraction of attractions) {
      const response = await client.distancematrix({
        params: {
          origins: [{ lat: latitude, lng: longitude }],
          destinations: [{ lat: attraction.latitude, lng: attraction.longitude }],
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });

      const distance = response.data.rows[0].elements[0].distance.text;
      distances.push({
        attraction: attraction.name,
        distance,
      });
    }

    res.status(201).json({
      message: 'Turista creado exitosamente',
      tourist,
      distances,
    });
  } catch (error) {
    console.error('Error al crear el turista o calcular la distancia:', error);
    res.status(500).json({ message: 'Error al crear el turista o calcular la distancia', error });
  }
};




exports.getTuristas = async (req, res) => {
  try {
    const turistas = await Turista.find();
    res.json(turistas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los turistas' });
  }
};

exports.getTuristaById = async (req, res) => {
  try {
    const turista = await Turista.findById(req.params.id);
    if (!turista) return res.status(404).json({ error: 'Turista no encontrado' });
    res.json(turista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el turista' });
  }
};

exports.updateTurista = async (req, res) => {
  try {
    const { email, phone, latitude, longitude } = req.body;
    const turista = await Turista.findByIdAndUpdate(
      req.params.id,
      { email, phone, latitude, longitude },
      { new: true }
    );
    if (!turista) return res.status(404).json({ error: 'Turista no encontrado' });
    res.json(turista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el turista' });
  }
};

exports.deleteTurista = async (req, res) => {
  try {
    const turista = await Turista.findByIdAndDelete(req.params.id);
    if (!turista) return res.status(404).json({ error: 'Turista no encontrado' });
    res.json({ message: 'Turista eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el turista' });
  }
};
 */
/* *********************** FIN DEL CODIGO QUE SOLO MIDE LA DISTANCIA ******************************************** */

/* const Turista = require('../models/Tourist');
const { Client } = require('@googlemaps/google-maps-services-js');
const Attraction = require('../models/Attraction');
const client = new Client({});

exports.createTurista = async (req, res) => {
  try {
    const { email, phone, latitude, longitude } = req.body;

    // Crear y guardar el turista
    const tourist = new Turista({ email, phone, latitude, longitude });
    await tourist.save();

    // Obtener todos los atractivos turísticos
    const attractions = await Attraction.find();
    const distances = [];
    const markers = [`${latitude},${longitude}`]; // Marcador del turista

    // Calcular distancia y preparar datos para el mapa
    for (const attraction of attractions) {
      const response = await client.distancematrix({
        params: {
          origins: [{ lat: latitude, lng: longitude }],
          destinations: [{ lat: attraction.latitude, lng: attraction.longitude }],
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });

      const distance = response.data.rows[0].elements[0].distance.text;
      distances.push({
        attraction: attraction.name,
        distance,
      });

      // Agregar marcador para el mapa
      markers.push(`${attraction.latitude},${attraction.longitude}`);
    }

    // Generar la URL del mapa estático con los marcadores
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&maptype=roadmap&markers=${markers.join(
      '|'
    )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    res.status(201).json({
      message: 'Turista creado exitosamente',
      tourist,
      distances,
      mapUrl,
    });
  } catch (error) {
    console.error('Error al crear el turista o calcular la distancia:', error);
    res.status(500).json({ message: 'Error al crear el turista o calcular la distancia', error });
  }
};

exports.getTuristas = async (req, res) => {
  try {
    const turistas = await Turista.find();
    res.json(turistas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los turistas' });
  }
};

exports.getTuristaById = async (req, res) => {
  try {
    const turista = await Turista.findById(req.params.id);
    if (!turista) return res.status(404).json({ error: 'Turista no encontrado' });
    res.json(turista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el turista' });
  }
};

exports.updateTurista = async (req, res) => {
  try {
    const { email, phone, latitude, longitude } = req.body;
    const turista = await Turista.findByIdAndUpdate(
      req.params.id,
      { email, phone, latitude, longitude },
      { new: true }
    );
    if (!turista) return res.status(404).json({ error: 'Turista no encontrado' });
    res.json(turista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el turista' });
  }
};

exports.deleteTurista = async (req, res) => {
  try {
    const turista = await Turista.findByIdAndDelete(req.params.id);
    if (!turista) return res.status(404).json({ error: 'Turista no encontrado' });
    res.json({ message: 'Turista eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el turista' });
  }
};
 */
/* *********************** FIN DEL CODIGO QUE CALCULA LA DISTANCIA Y TE DEVUELVE UN MAPA ******************************************** */

const Turista = require('../models/Tourist');
const { Client } = require('@googlemaps/google-maps-services-js');
const Attraction = require('../models/Attraction');
const client = new Client({});

// Función para calcular distancia entre dos coordenadas (haversine)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia en km
}

exports.createTurista = async (req, res) => {
  try {
    const { email, phone, latitude, longitude } = req.body;

    // Crear y guardar el turista
    const tourist = new Turista({ email, phone, latitude, longitude });
    await tourist.save();

    // Obtener todos los atractivos turísticos
    const attractions = await Attraction.find();

    // Filtrar atractivos dentro de un radio de 10 km
    const nearbyAttractions = attractions.filter(attraction => {
      const distance = calculateDistance(
        latitude,
        longitude,
        attraction.latitude,
        attraction.longitude
      );
      return distance <= 10; // Limita a 10 km
    });

    if (nearbyAttractions.length === 0) {
      return res.status(200).json({
        message: 'No se encontraron atractivos turísticos dentro de 10 km.',
        tourist,
      });
    }

    const distances = [];
    const markers = [`${latitude},${longitude}`]; // Marcador del turista

    // Calcular la distancia a cada atractivo cercano
    for (const attraction of nearbyAttractions) {
      const response = await client.distancematrix({
        params: {
          origins: [{ lat: latitude, lng: longitude }],
          destinations: [{ lat: attraction.latitude, lng: attraction.longitude }],
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      });

      const distance = response.data.rows[0].elements[0].distance.text;
      distances.push({
        attraction: attraction.name,
        distance,
      });

      // Agregar marcador para el mapa
      markers.push(`${attraction.latitude},${attraction.longitude}`);
    }

    // Generar la URL del mapa estático con los marcadores
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&maptype=roadmap&markers=${markers.join(
      '|'
    )}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    res.status(201).json({
      message: 'Turista creado exitosamente',
      tourist,
      distances,
      mapUrl,
    });
  } catch (error) {
    console.error('Error al crear el turista o calcular la distancia:', error);
    res.status(500).json({ message: 'Error al crear el turista o calcular la distancia', error });
  }
};

exports.getTuristas = async (req, res) => {
  try {
    const turistas = await Turista.find();
    res.json(turistas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los turistas' });
  }
};

exports.getTuristaById = async (req, res) => {
  try {
    const turista = await Turista.findById(req.params.id);
    if (!turista) return res.status(404).json({ error: 'Turista no encontrado' });
    res.json(turista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el turista' });
  }
};

exports.updateTurista = async (req, res) => {
  try {
    const { email, phone, latitude, longitude } = req.body;
    const turista = await Turista.findByIdAndUpdate(
      req.params.id,
      { email, phone, latitude, longitude },
      { new: true }
    );
    if (!turista) return res.status(404).json({ error: 'Turista no encontrado' });
    res.json(turista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el turista' });
  }
};

exports.deleteTurista = async (req, res) => {
  try {
    const turista = await Turista.findByIdAndDelete(req.params.id);
    if (!turista) return res.status(404).json({ error: 'Turista no encontrado' });
    res.json({ message: 'Turista eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el turista' });
  }
};

