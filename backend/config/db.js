import mongoose from "mongoose";
import colors from "colors";

//  mongoose.connection. It includes details like the connection status, database name, host, port, and more. You can access this property using mongoose.connection.

// .host indicates the host (server address) to which the MongoDB client is connected. 
const ConnectDb= async ()=>{
    try {
        const con = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`Connected to mongoDB server ${con.connection.host}`.bgBlue);
    } catch (error) {
        console.log(`Error connecting to mongoDB server ${error}`)
    }
};
export default ConnectDb;
// Important to know whenever you use any kind of operation with database you should  use async await;

