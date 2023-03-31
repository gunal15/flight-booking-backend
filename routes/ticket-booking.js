const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const Ticket = require("../model/Ticket");
const { verifyToken } = require("./verifytoken");
const Razorpay = require("razorpay");


// Create a new Razorpay instance with your API key and secret
const razorpay = new Razorpay({
  key_id: 'rzp_test_XpMWpnZvs94XYZ',
  key_secret: 'gWwfvb4Xo9R2e0JtWlstwV8c',
});

router.post("/book-ticket/:userid", verifyToken, async (request, response) => {
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

    // Create a new payment order with the ticket price
    const order = await razorpay.orders.create({
      amount: savedTicket.price * 100, // amount in paise (i.e. 500 rupees)
      currency: 'INR',
      receipt: savedTicket._id.toString(),
      payment_capture: 1,
    });

    response.status(200).json({
      message: "Ticket booked!",
      savedTicket,
      order_id: order.id, // Send the order ID to the front-end
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
