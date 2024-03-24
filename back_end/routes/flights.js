const express = require('express');
const flightsControllers = require('../controllers/flights.controller');

const router = express.Router();

router.post('/', flightsControllers.createFlights);
router.get('/', flightsControllers.getFlights);
router.get('/:id', flightsControllers.getFlightById);
router.patch('/:id', flightsControllers.updateFlight);
router.delete('/:id', flightsControllers.deleteFlight);

module.exports = router;