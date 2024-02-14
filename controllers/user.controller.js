const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    console.log("ALERT")
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      company: req.body.company,
      password: hashedPassword
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};