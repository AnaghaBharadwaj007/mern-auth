import bcrypt from "bcryptjs";
import User from "../Models/User.model.js";

export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { userName, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ userName, email, password: hashedPassword });
    return res.status(200).json("User created Successfully");
  }
  catch (err) {
    next(err);
  }
}
//User.create() is shorthand for creating + saving in one step.