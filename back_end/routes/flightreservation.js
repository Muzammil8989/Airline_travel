const express = require('express');
const Reservationcontroller = require('../controllers/flightReservation.controller');
const router = express.Router();

router.post('/', Reservationcontroller.createReservation);
router.patch('/:id', Reservationcontroller.update);
router.delete('/:id', Reservationcontroller.deleteReservation);
router.get('/:id', Reservationcontroller.getReservationByid);
router.get('/', Reservationcontroller.getReservation);

module.exports = router;
