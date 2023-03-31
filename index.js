const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth");
const dateRoute = require("./routes/dateChecker");
const ticketRoute = require("./routes/ticket-booking");
const mailRoute = require("./routes/mail");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((error) => console.log(error));

//Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (request, response) => {
  response.send("Server is running");
});
//Listen Port
app.listen(process.env.PORT || 3001, () => {
  console.log("Backend Server is running!!");
});

app.use("/api/auth", authRoute);
app.use("/api/date", dateRoute);
app.use("/api/ticket", ticketRoute);
app.use("/api/mail", mailRoute);
