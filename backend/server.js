import express from "express";
import colors from "colors";
import ConnectDb from "./config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieparser from "cookie-parser";
// We write dotenv.config() to load the environment variables from the .env file into process.env. This allows the app to access those variables (like MONGO_URL) anywhere in the code.

dotenv.config();
ConnectDb();
const app = express();



// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(cookieparser());



// Routes
import userRoutes from "./Routes/Route.js";
// ctrl + click on userroutes to go to userroutes directily
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen);
});
