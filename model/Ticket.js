const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },

  to: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  airline: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  food: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
