import categoryModel from "../Models/categoryModel.js";
import slugify from "slugify";
//------------------------------------------------------createcategoryController
const createcategoryController = async (req, res) => {
  const { name} = req.body;
  console.log(req.body);

  try {
    if (!name)
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });

    const isExist = await categoryModel.findOne({ name });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "category already exist" });
    }
    const newcategory = await categoryModel.create({
      name,
     slug:slugify(name,{lowercase:true,strict:true}),
    });
    res.status(200).send({
      success: true,
      message: "category created  successfully",
      newcategory,
    });
  } catch (error) {
    console.log( `Error in category controller ${error}`);
    res
      .status(401)
      .send({ success: false, message: `Error in category controller: ${error}` });
  }
};

//--------------------------------------------------------------getallcategoriesController
const getallcategoriesController = async (req, res) => {
 

    const controllerCategory = await categoryModel.find({ });
   
    try {
       res.status(200).send({
      success: true,
      message: "categories fetched successfully",controllerCategory,
      Total : controllerCategory.length,
     
    });
      
    } catch (error) {
      console.log( `Error in getallcategoriesControllerr ${error}`);
      res
        .status(401)
        .send({ success: false, message: `Error in getallcategoriesController: ${error}` });
      
    }
  }

  //---------------------------------------------------------DeleltecategoryController
  const DeleltecategoryController= async (req,res)=>{
 try {
  const { slug } = req.params;
  console.log(slug);

  const category = await categoryModel.findOneAndDelete({slug});
  if (!category){
    return res.status(404).send({ success: false, message: "category not found" });
  }
  return res.status(200).send({ success: true, message: "category deleted successfully" });
  
 }catch (error) {
    console.log( `Error in DeleltecategoryController ${error}`);
    res
     .status(401)
     .send({ success: false, message: `Error in DeleltecategoryController: ${error}` });
  
 }

  }



  //---------------------------------------------------------getSinglecategoryController
  const getSinglecategoryController= async (req,res)=>{
 try {
  const { slug } = req.params;

  const category = await categoryModel.findOne({slug});
  if (!category){
    return res.status(404).send({ success: false, message: "category not found" });
  }
  return res.status(200).send({ success: true, message: "category fetched successfully",category });
  
 }catch (error) {
    console.log( `Error in getSinglecategoryController ${error}`);
    res
     .status(401)
     .send({ success: false, message: `Error in getSinglecategoryController: ${error}` });
  
 }

  }




  //---------------------------------------------------------updatecategoryController
  const updateCategoryController= async (req,res)=>{
   const { slug } = req.params;
   const {name} = req.body;
   if (!name) {
     return res
       .status(400)
       .send({ success: false, message: "category name is required" });
   }

    const category = await categoryModel.findOneAndUpdate({slug},{name, slug : slugify(name,{lower:true, strict:true})},{new:true});
    if (!category){
      return res.status(404).send({ success: false, message: "category not found" });
    }
     return res.status(200).send({ success: true, message: "category updated  successfully",category });

  }





export {
  createcategoryController,getallcategoriesController,DeleltecategoryController,updateCategoryController,getSinglecategoryController
 
};