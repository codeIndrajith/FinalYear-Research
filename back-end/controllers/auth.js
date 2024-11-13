const User = require('../models/User')
const generateToken = require('../utils/generateToken');
const register = async (req, res, next) => {
    try {
        const existUser = await User.findOne({ email: req.body.email });
        if(existUser) {
            res.status(400);
            throw new Error("User Already exist")
        }

        const user = await User.create(req.body)

        if(user) {
            generateToken(res, user._id);

            res.status(201).json({success: true, message: "User created"})
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {register};