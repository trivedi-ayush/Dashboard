const User = require("../models/User-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const home = async (req, res) => {
  try {
    res.status(200).send("welcome to home page");
  } catch (error) {
    res.status(400).send("error");
  }
};

// REGISTRATION
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userexists = await User.findOne({ email });
    if (userexists) {
      return res.status(400).json({ msg: "email already exists" });
    }
    const usercreated = await User.create({ username, email, phone, password });

    res.status(201).json({
      message: "registration successful",
      token: await usercreated.generatetoken(),
      userId: usercreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("internal server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({ message: "User doesen't exist" });
    }
    const user = await bcrypt.compare(password, userExist.password);
    if (user) {
      res.status(200).json({
        message: "Login successful",
        token: await userExist.generatetoken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "invalid password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("internal server error");
  }
};

module.exports = { home, register, login };
