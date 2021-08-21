const router = require("express").Router();
const Bcrypt = require("bcryptjs");
const User = require("../models/userModel");

router.get("/login", (req, res) => {
  res.send("This is users route");
});

//register new user.....
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await Bcrypt.genSalt(10);
    const hashPassword = await Bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const databaseResponse = await newUser.save();
    res.send(databaseResponse);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/login", async(req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(300).json({ message: "empty fields" });
    } else {
      const isUser = await User.findOne({ email });
      !isUser && res.status(404).json({ message: "user not found!" });

      const isPasswordCorrect = await Bcrypt.compare(password, isUser.password);
      !isPasswordCorrect &&
        res.status(400).json({ message: "incorrect password" });

      res.status(200).json(isUser);
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
