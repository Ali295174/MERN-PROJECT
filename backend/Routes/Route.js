import express from 'express';
import {registerController} from '../Controller/userController.js';



const Router = express.Router();
// http://localhost:8080/api/v1/users/register
Router.post("/register",registerController);

export default Router;