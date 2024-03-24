const models = require("../models");

function createFlights(req, res) {
  const flight = {
    from: req.body.from,
    to: req.body.to,
    date: req.body.date,
    time: req.body.time,
    type: req.body.type,
    duration: req.body.duration,
    airline: req.body.airline,
    price: req.body.price,
    availableSeat: req.body.availableSeat,
  };

  models.Flight.create(flight)
    .then((result) => {
      res.status(200).json({
        message: "Flight created successfully",
        flight: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred while creating the flight",
        error: err,
      });
    });
}

function getFlights(req, res) {
 

  models.Flight.findAll()
    .then((flights) => {
      res.status(200).json({
        message: "Flights retrieved successfully",
        flights: flights,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred while retrieving flights",
        error: err,
      });
    });
  
}
function getFlightById(req, res) {
  const id = req.params.id;

  models.Flight.findByPk(id)
    .then((flight) => {
      if (!flight) {
        return res.status(404).json({
          message: "Flight not found",
        });
      }

      res.status(200).json({
        message: "Flight retrieved successfully",
        flight: flight,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred while retrieving the flight",
        error: err,
      });
    });
}

function updateFlight(req, res) {
  const id = req.params.id;
  const updatedFlightData = {
    from: req.body.from,
    to: req.body.to,
    date: req.body.date,
    time: req.body.time,
    type: req.body.type,
    duration: req.body.duration,
    airline: req.body.airline,
    price: req.body.price,
    availableSeat: req.body.availableSeat,
    
  };

  models.Flight.findByPk(id)
    .then((flight) => {
      if (!flight) {
        return res.status(404).json({
          message: "Flight not found",
        });
      }

      flight
        .update(updatedFlightData)
        .then(() => {
          res.status(200).json({
            message: "Flight updated successfully",
            flight: flight,
          });
        })
        .catch((updateErr) => {
          res.status(500).json({
            message: "An error occurred while updating the flight",
            error: updateErr,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred while retrieving the flight",
        error: err,
      });
    });
}

function deleteFlight(req, res) {
  const id = req.params.id;

  models.Flight.findByPk(id)
    .then((flight) => {
      if (!flight) {
        return res.status(404).json({
          message: "Flight not found",
        });
      }

      flight
        .destroy()
        .then(() => {
          res.status(200).json({
            message: "Flight deleted successfully",
          });
        })
        .catch((deleteErr) => {
          res.status(500).json({
            message: "An error occurred while deleting the flight",
            error: deleteErr,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "An error occurred while retrieving the flight",
        error: err,
      });
    });
}

  




module.exports = {
  createFlights: createFlights,
  getFlights: getFlights,
  getFlightById: getFlightById,
  updateFlight: updateFlight,
  deleteFlight: deleteFlight,
};
