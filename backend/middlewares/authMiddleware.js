import jwt from "jsonwebtoken";
import userModel from "../Models/model.js";

const isAuthorised = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .send({ success: false, message: "please login to access this info!" });
    }
    //userModel.findById(decodedtoken.id) checks if the user still exists in the database.
    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodedtoken.id);
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ success: false, message: `Authorization error: ${error}` });
  }
};

// ------------------------------------------Admin authentication method
const adminauthentication = async (req, res, next) => {
  try {
   
    const user = req.user;
    if (!user || user.role  !== 1) {
      return res
        .status(403)
        .send({
          success: false,
          message: "You are not authorized to access this area!"
        });
    }
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ success: false, message: `Authorization error: ${error.message}` });
  }
};

export { isAuthorised,adminauthentication};
