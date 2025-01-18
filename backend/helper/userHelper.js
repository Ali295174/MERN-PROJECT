import bcrypt from "bcrypt";


const encryptedpassword= async (PlainPassword)=>{
const saltRounds = 10;
const encryptedpassword = await bcrypt.hash(PlainPassword,saltRounds);
return  encryptedpassword;
};
export {encryptedpassword};