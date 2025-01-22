import { encryptedpassword ,comparingpassword } from "../helper/userHelper.js";
import usermodel from "../Models/model.js";

const registerController = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);

    try {
        if (!name || !email || !password) 
            return res.status(400).send({ success: false, message: "All fields are required" });
        const isExist = await usermodel.findOne({email});
        if(isExist){
            return res.status(400).send({ success: false, message: "Email already exist" });
        }
        const hashedPassword = await encryptedpassword(password);
        const newUser = await usermodel.create({ name, email, password : hashedPassword});
        res.status(200).send({ success: true, message: "User registered successfully",newUser });
    }

     catch (error) {
       
        console.log(error);
        res.status(401).send({ success: false, message: `User registration error: ${error}` });
    }
};
const loginController=async(req,res)=>{
    const {  email, password } = req.body;
   try {
//    User validation
    if ( !email || !password) 
        return res.status(400).send({ success: false, message: "All fields are required" });

    // check if email already present
    const user = await usermodel.findOne({email});
    if(!user){
        return res.status(400).send({ success: false, message: "Email dosen't exist" });
    }
// Matching password
const ismatch = await comparingpassword(password,user.password);
if(!ismatch){
    return res.status(401).send({ success: false, message: "Error in Email/Password" });
}
// remove password of user send userdata from frontend to backend
user.password = undefined;
// send succes message
return res.status(200).send({ success: true, message: " user Login successfully" ,user})
   } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, message: `User login error: ${error}` });
   }
}

export {registerController,loginController};
