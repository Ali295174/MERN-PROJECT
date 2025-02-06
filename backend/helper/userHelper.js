import bcrypt from "bcrypt";

const encryptedpassword= async (PlainPassword)=>{
const saltRounds = 10;
const encryptedpassword = await bcrypt.hash(PlainPassword,saltRounds);
return  encryptedpassword;
};

// comparing password take two arguments first is user password and second is hasheed password which is encrypted password present in our data base

const comparingpassword = async(userpassword,hashedpassword)=>{
   return await bcrypt.compare(userpassword,hashedpassword);
}
export {encryptedpassword,comparingpassword};