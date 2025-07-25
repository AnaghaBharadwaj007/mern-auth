import bcrypt from "bcryptjs";
import User from "../Models/User.model.js";

export const signup = async (req, res) => {
  // console.log(req.body);
  const { userName, email, password } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ userName, email, password: hashedPassword });
    res.status(200).json("User created Successfully");
  }
  catch (err) {
    res.status(500).json(err.message);
  }

  res.json("New user created successfully");
}
//User.create() is shorthand for creating + saving in one step.