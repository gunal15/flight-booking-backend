const User = require("../model/Users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Register
router.post("/register", async (request, response) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(request.body.password, salt);
  request.body.password = hash;
  const newUser = new User({
    username: request.body.username,
    emailid: request.body.email,
    password: request.body.password,
    name: request.body.name,
  });

  try {
    const savedUser = await newUser.save();
    response.status(200).json({
      message: "User added!",
      savedUser,
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

//Login
router.post("/", async (request, response) => {
  try {
    const user = await User.findOne({ username: request.body.username });
    if (user) {
      const match = await bcrypt.compare(request.body.password, user.password);
      if (match) {
        const token = jwt.sign(
          { id: user._id, username: user.username},
          process.env.SECRET
        );

        response.status(200).json({
          user,
          message: "Successfully logged in!",
          token
        });
      } else {
        response.json({
          message: "Password Incorrect",
        });
      }
    } else {
      response.json({
        message: "User not found!",
      });
    }
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
