import express from "express";
import {
  allusersController,
  loginController,
  logoutController,
  registerController,
} from "../Controller/userController.js";
import {adminauthentication, isAuthorised} from "../middlewares/authMiddleware.js";

const Router = express.Router();

// http://localhost:8080/api/v1/users/register
Router.post("/register", registerController);

// http://localhost:8080/api/v1/users/login
Router.post("/login", loginController);

// http://localhost:8080/api/v1/users/logout
Router.get("/logout", logoutController);

// http://localhost:8080/api/v1/users/all-users
Router.get("/all-users",isAuthorised,adminauthentication, allusersController);

export default Router;
