const router = require("express").Router();
var nodemailer = require("nodemailer");

router.post("/message", async (request, response) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "testnodemail04@gmail.com",
        pass: process.env.pass,
      },
    });

    var mailOptions = {
      from: "testnodemail04@gmail.com",
      to: request.body.mailid,
      subject: "Flight Ticket",
      text: "Flight Ticket",
      html: `  <div className="card mt-3">
      <h5 className="card-header  ">
        Ticket on ${request.body.airline}
      </h5>
      <div className="card-body">
        <h5 className="card-title">From ${request.body.from} to ${request.body.to}</h5>
        <h5>Date:${request.body.date} </h5>
       
        <h5>Total Ticket Price : ${request.body.price}</h5>
      </div>
    </div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        response.json({
          message: "Email not send",
        });
      } else {
        console.log("Email sent: " + info.response);
        response.json({
          message: "Email Send",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
