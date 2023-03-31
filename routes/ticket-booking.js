const router = require("express").Router();
const Ticket = require("../model/Ticket");
const { verifyToken } = require("./verifytoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

    // Create a new payment intent with the ticket price
    const paymentIntent = await stripe.paymentIntents.create({
      amount: savedTicket.price * 100, // amount in cents
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        ticket_id: savedTicket._id.toString(),
      },
    });

    response.status(200).json({
      message: "Ticket booked!",
      savedTicket,
      client_secret: paymentIntent.client_secret, // Send the client secret to the front-end
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
