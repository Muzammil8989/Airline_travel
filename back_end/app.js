const express = require('express');
const cors = require("cors");
const app = express();
const path = require('path');

const userRoutes = require('./routes/users');
const flightRoutes = require('./routes/flights');
const flightReservationRoutes = require('./routes/flightreservation');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "front_end")));


app.use('/users', userRoutes);

app.use('/flights', flightRoutes);

app.use('/flightreservation', flightReservationRoutes);


module.exports = app;
