const mongoose = require("mongoose");
const { type } = require("os");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//hashing the passowrd
userSchma.pre("save", async function (next) {
  const user = this;
  if (!this.isModified("password")) {
    next();
  }

  try {
    const hashpassword = await bcrypt.hash(user.password, 3);
    user.password = hashpassword;
  } catch (error) {
    next(error);
  }
});

//JWT

userSchma.methods.generatetoken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const User = new mongoose.model("User", userSchma);

module.exports = User;
