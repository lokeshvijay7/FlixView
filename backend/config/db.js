import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect_db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
   console.log("MongooDB connected successfully", conn.connection.host);
  

  }
  catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

export default connect_db;