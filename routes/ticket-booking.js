const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Ticket = require("../model/Ticket");
const { verifyToken } = require("./verifytoken");

router.post("/book-ticket/:userid",verifyToken, async (request, response) => {
  const newTicket = new Ticket({
    date: request.body.date,
    from: request.body.from,
    to: request.body.to,
    price: request.body.price,
    airline: request.body.airline,

    userid: request.params.userid,
    food: request.body.food,
  });

  try {
    const savedTicket = await newTicket.save();
    response.status(200).json({
      message: "Ticket booked!",
      savedTicket,
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/ticket/:userid/:ticketid", verifyToken, async (request, response) => {
  try {
    let ticket = await Ticket.findById(request.params.ticketid);
    if (ticket) {
      response.status(200).json({ message: "Ticket Found", ticket });
    } else {
      response.status(400).json({ message: "Ticket Not Found" });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get("/allticket/:userid",verifyToken, async (request, response) => {
  try {
    let tickets = await Ticket.find({
      userid: mongoose.Types.ObjectId(request.params.userid),
    });
    if (tickets) {
      response.status(200).json({ message: "Ticket Found", tickets });
    } else {
      response.status(400).json({ message: "Ticket Not Found" });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});
module.exports = router;
