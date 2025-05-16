import User from '../models/user.model.js'; // Import the User model
import bcrypt from 'bcryptjs'; 

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
  res.send('Signup Page');
}
export async function logout(req, res) {
  res.send('Logout Page');
}
