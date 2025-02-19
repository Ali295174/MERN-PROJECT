import express from "express";
import {adminauthentication, isAuthorised} from "../middlewares/authMiddleware.js";
import { addProductController, getAllproductsController } from "../Controller/productController.js";
import { upload } from "../middlewares/multerMiddlewares.js";

const productsRouter = express.Router();

// http://localhost:8080/api/v1/products/-POST
productsRouter.post("/",upload.single("picture"),isAuthorised,adminauthentication, addProductController);


// http://localhost:8080/api/v1/products/-GET
productsRouter.get("/",getAllproductsController);




// http://localhost:8080/api/v1/products/-DELETE



// http://localhost:8080/api/v1/products/-PUT




// http://localhost:8080/api/v1/products/-GET


export default productsRouter;
