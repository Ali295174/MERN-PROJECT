import express from 'express';
import {loginController, registerController} from '../Controller/userController.js';



const Router = express.Router();
// http://localhost:8080/api/v1/users/register
Router.post("/register",registerController);
// http://localhost:8080/api/v1/users/login
Router.post("/login",loginController);

export default Router;