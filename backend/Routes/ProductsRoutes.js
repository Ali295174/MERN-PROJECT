import express from "express";
import {adminauthentication, isAuthorised} from "../middlewares/authMiddleware.js";
import { addProductController, deleteAllproductsController, getAllproductsController, getSingleProductController, updateSingleproductsController } from "../Controller/productController.js";
import { upload } from "../middlewares/multerMiddlewares.js";

const productsRouter = express.Router();

// http://localhost:8080/api/v1/products/-POST
productsRouter.post("/",upload.single("picture"),isAuthorised,adminauthentication, addProductController);


// http://localhost:8080/api/v1/products/-GET
productsRouter.get("/",getAllproductsController);




// http://localhost:8080/api/v1/products/productId-DELETE
productsRouter.delete("/:productId", isAuthorised, adminauthentication, deleteAllproductsController);



// http://localhost:8080/api/v1/products/-PUT
productsRouter.put("/:productId",upload.single("picture"), isAuthorised, adminauthentication, updateSingleproductsController);




// http://localhost:8080/api/v1/products/-GET

productsRouter.get("/:productId", getSingleProductController);


export default productsRouter;
