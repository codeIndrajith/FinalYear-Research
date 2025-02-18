const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const register = async (req, res, next) => {
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = await User.create(req.body);

    if (user) {
      generateToken(res, user._id);

      return res
        .status(201)
        .json({ success: true, message: "Registration complete" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await user.matchPassword(req.body.password))) {
      generateToken(res, user._id);
      res.status(200).json({ success: true, message: "Auth complete" });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
