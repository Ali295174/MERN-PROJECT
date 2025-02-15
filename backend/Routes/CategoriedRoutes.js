import express from "express";
import {adminauthentication, isAuthorised} from "../middlewares/authMiddleware.js";
import { createcategoryController, DeleltecategoryController, getallcategoriesController, getSinglecategoryController, updateCategoryController } from "../Controller/categoryController.js";


const categoriesRouter = express.Router();

// http://localhost:8080/api/v1/categories/-POST
categoriesRouter.post("/",isAuthorised,adminauthentication, createcategoryController);


// http://localhost:8080/api/v1/categories/-GET
categoriesRouter.get("/:slug",isAuthorised,adminauthentication, getSinglecategoryController);



// http://localhost:8080/api/v1/categories/-DELETE
categoriesRouter.delete("/:slug",isAuthorised,adminauthentication, DeleltecategoryController);


// http://localhost:8080/api/v1/categories/-PUT
categoriesRouter.put("/:slug",isAuthorised,adminauthentication, updateCategoryController);



// http://localhost:8080/api/v1/categories/-GET
categoriesRouter.get("/",getallcategoriesController);

export default categoriesRouter;
