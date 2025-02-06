import { encryptedpassword, comparingpassword } from "../helper/userHelper.js";
import usermodel from "../Models/model.js";
import jwt from "jsonwebtoken";

//----------------------------------------------register controller
const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    if (!name || !email || !password)
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    const isExist = await usermodel.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "Email already exist" });
    }
    const hashedPassword = await encryptedpassword(password);
    const newUser = await usermodel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).send({
      success: true,
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ success: false, message: `User registration error: ${error}` });
  }
};

//----------------------------------------------login controller
const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    //    User validation
    if (!email || !password)
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });

    // check if email already present
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "Email dosen't exist" });
    }
    // Matching password
    const ismatch = await comparingpassword(password, user.password);
    if (!ismatch) {
      return res
        .status(401)
        .send({ success: false, message: "Error in Email/Password" });
    }
    // genreating key
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });
    // remove password of user send userdata from frontend to backend
    user.password = undefined;
    // send succes message
    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(200)
      .send({
        success: true,
        message: " user Login successfully",
        user,
        token,
      });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ success: false, message: `User login error: ${error}` });
  }
};

//----------------------------------------------logout controller
const logoutController = async (req, res) => {
  try {
    // Clear the cookie by setting it to an empty string
    return res
      .cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
      }) // Set an expired date to ensure the cookie is invalidated
      .status(200)
      .send({
        success: true,
        message: "User logged out successfully",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: `Logout error: ${error.message}` });
  }
};

//-----------------------------------------------allusersController
const allusersController = async (req, res) => {
  try {
    // check if email already present
    const users = await usermodel.find({}).select("-password");
    if (!users) {
      return res.status(400).send({ success: false, message: "No user found" });
    }

    return res.status(200).send({
      Total: (`${users.length} users` ),
      success: true,
      users,
      
    });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({
        success: false,
        message: `alllUsersController  error: ${error}`,
      });
  }
};

export {
  registerController,
  loginController,
  logoutController,
  allusersController,
};
