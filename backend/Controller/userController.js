import { encryptedpassword } from "../helper/userHelper.js";
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

export {registerController};
