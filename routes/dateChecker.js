const { verifyToken } = require("./verifytoken");

const router = require("express").Router();

function monthDiff(d1, d2) {
  d1 = new Date(d1);
  d2 = new Date(d2);

  var diff = (d2.getTime() - d1.getTime()) / 1000;
  diff /= 60 * 60 * 24 * 7 * 4;

  return Math.abs(Math.round(diff));
}

router.post("/dashboard",verifyToken, async (request, response) => {
  try {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    let resDate = request.body.date;
    let diff = monthDiff(resDate, today);
    let offer;
    if (!(resDate < today)) {
      if (diff >= 6) {
        offer = 50;
      } else if (diff == 5) {
        offer = 40;
      } else if (diff == 4) {
        offer = 30;
      } else if (diff == 3) {
        offer = 20;
      } else if (diff == 2) {
        offer = 10;
      } else {
        offer = 0;
      }
      response.status(200).json({ message: "All Good", offer });
    } else {
      response
        .status(400)
        .json({ message: "Date should not be lesser than today" });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
