import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.model.js";
import { errorHandler } from "../error.js";

export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ username, email, password: hashedPassword });
    return res.status(200).json("User created Successfully");

  }
  catch (err) {
    console.log(err)
    next(err);
  }
}
//User.create() is shorthand for creating + saving in one step.

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User with that email not found"))
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    //separating the password from rest , to send it to use as response.
    const { password: hashedPassword, ...rest } = validUser._doc;

    //creating a token {payload, secretOrPrivateKey, [options]}
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
  }
  catch (err) {
    next(err);
  }

}