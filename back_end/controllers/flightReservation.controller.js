const models = require("../models");

function createReservation(req,res){
    const reservation= {
        from: req.body.from,
        to: req.body.to,
        date: req.body.date,
        time: req.body.time,
        type: req.body.type,
        duration: req.body.duration,
        airline: req.body.airline,
        price: req.body.price,
        classs: req.body.classs,
        fare: req.body.fare,
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        address: req.body.address
    }
     models.FlightReservation.create(reservation).then((result)=>{
         res.status(200).json({
             message: "Flight Reservation created successfully",
             reservation: result
         })
     }).catch((err)=>{
         res.status(500).json({
             message: "An error occurred while creating the reservation",
             error: err
         })
     })
   

}
function update(req,res){
    const id = req.params.id;
    const updatedReservation = {
        from: req.body.from,
        to: req.body.to,
        date: req.body.date,
        time: req.body.time,
        type: req.body.type,
        duration: req.body.duration,
        airline: req.body.airline,
        price: req.body.price,
        classs: req.body.classs,
        fare: req.body.fare,
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        address: req.body.address
    }
    models.FlightReservation.findByPk(id).then((reservation)=>{
        if(!reservation){
            return res.status(404).json({
                message: "Flight Reservation not found"
            })
        }
        reservation.update(updatedReservation).then(()=>{
            res.status(200).json({
                message: "Flight Reservation updated successfully",
                reservation: reservation
            })
        }).catch((err)=>{
            res.status(500).json({
                message: "An error occurred while updating the reservation",
                error: err
            })
        })
    })
}
function deleteReservation(req,res){
    const id = req.params.id;
    models.FlightReservation.findByPk(id).then((reservation)=>{
        if(!reservation){
            return res.status(404).json({
                message: "Flight Reservation not found"
            })
        }
        reservation.destroy().then(()=>{
            res.status(200).json({
                message: "Flight Reservation deleted successfully"
            })
        }).catch((err)=>{
            res.status(500).json({
                message: "An error occurred while deleting the reservation",
                error: err
            })
        })
    })
}
function getReservation(req,res){
    models.FlightReservation.findAll().then((reservation)=>{
        res.status(200).json({
            message: "Flight Reservation retrieved successfully",
            reservation: reservation
        })
    }).catch((err)=>{
        res.status(500).json({
            message: "An error occurred while retrieving the reservation",
            error: err
        })
    })
}
function getReservationByid(req,res){
    const id = req.params.id;
    models.FlightReservation.findByPk(id).then((reservation)=>{
        if(!reservation){
            return res.status(404).json({
                message: "Flight Reservation not found"
            })
        }
        res.status(200).json({
            message: "Flight Reservation retrieved successfully",
            reservation: reservation
        })
    }).catch((err)=>{
        res.status(500).json({
            message: "An error occurred while retrieving the reservation",
            error: err
        })
    })
}
module.exports = {
    createReservation: createReservation,
    update: update,
    deleteReservation: deleteReservation,
    getReservation: getReservation,
    getReservationByid: getReservationByid
}
