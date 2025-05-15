import mongoose from "mongoose";

// Create a new schema for the user model

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email : {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:""
  },
  searchHistory: {
    type: Array,
    default: []
  }
  },
  {
    timestamps: true
  }
);

const user = mongoose.model("User", userschema);

// Expore the user model to be used in amother file
export default user;