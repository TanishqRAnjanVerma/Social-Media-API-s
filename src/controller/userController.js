import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default class UserControlller {
  // Sign up
  async signUp(req, res) {
    const { name, email, password } = req.body;

    // Check if user already exists
    if (UserModel.findByEmail(email)) {
      return res.status(409).send("Email is already in use.");
    }

    const user = await UserModel.SignUp(name, email, password);
    res.status(201).send(user);
  }

  // Sign in
  async signIn(req, res) {
    const result = await UserModel.SignIn(req.body.email, req.body.password);
    if (!result) {
      return res.status(401).send("Invalid Credentials");
    } else {
      // Create a token
      const token = jwt.sign(
        { userId: result.id, email: result.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Send token
      const userResponse = {
        id: result.id,
        name: result.name,
        email: result.email,
      };
      res.status(200).send({ user: userResponse, token });
    }
  }

  // Get all users
  getAllUsers(req, res) {
    let allUsers = UserModel.getAllUsers();
    allUsers = allUsers.map(({ password, ...rest }) => rest);
    res.status(200).send(allUsers);
  }
}
