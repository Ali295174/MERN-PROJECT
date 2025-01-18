//   We use Mongoose because it simplifies working with MongoDB in Node.js
  import mongoose from "mongoose";
// we take two objects in mongoose.schema in first we define feilds which we requie for user and second object is timestamps which is true which tell us which time we added data in user and which time we update it;
const userSchema = new mongoose.Schema({
    name: { type: String, required: true , },
    email: { type: String, required: true, unique: true,trim:true ,lowercase:true },
    password: { type: String, required: true },
    role:{
        type: Number,
        default: 0,
    },
},{timestamps : true});
export default mongoose.model('User',userSchema);

//  in export default we gave first the name of collection in which we want to collect data by default when it create a collectin name it convert first capital letter into small letter and add "s " at the end For exaple it convert User into users; and in second we send our schema the data to collection; in which we tell what kind of collection should be created;