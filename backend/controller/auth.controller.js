import User from '../models/user.model.js'; // Import the User model
import bcrypt from 'bcryptjs'; 
import  { generateTokenAndSetCookie }  from '../utils/generateToken.js'; // Import the JWT utility function

export async function signup(req, res) {
  console.log(req.body); // Debugging line

  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password){
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if(password.length <  6){
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailregex.test(email)){
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    const existinguseremail = await User.findOne({email:email});
    if(existinguseremail){
      return res.status(400).json({ message: "Email already exists" });
    }
    const existinguser = await User.findOne({username:username});
    if(existinguser){
      return res.status(400).json({ message: "Username already exists" });
    }  
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = new User({
      email,
      username,
      email,
      password:hashedPassword,
      image:""
    })
   
    generateTokenAndSetCookie(newuser._id, res);
    const saveduser = await newuser.save();
    res.status(201).json({ sucess: true , user : {
      ...saveduser._doc,
      password: ""
    }});
    
    


    if(!saveduser){
      return res.status(400).json({ message: "User not created" });
    }

  } catch (error) {
    console.log("Error in signup :" + error.message);
    return res.status(500).json({ message: "Internal server error" });
    
  }

}




export async function login(req, res) {

  try {
    const { email,  password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({email:email});
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const paswordisMatch = await bcrypt.compare(password, user.password);
    if (!paswordisMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateTokenAndSetCookie(user._id, res);

    res. status(200).json({ sucess: true , user : {
      ...user._doc,
      password: ""
    }});
    
  } catch (error) {
    console.log("Error in login :" + error.message);
    return res.status(500).json({ message: "Internal server error" });
    
  }


}



export async function logout(req, res) {
  try {
    res.clearCookie("JWT-FLIXVIEW");
    return res.status(200).json({ message: "Logged out successfully" });
  }
  catch (error) {
    console.log("Error in logout :" + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }

}
