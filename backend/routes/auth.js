const express=require('express');
const mongoose = require('mongoose');
const {body,validationResult}=require('express-validator')
const User=require('../models/User')
const {Schema}=mongoose;
const router=express.Router();
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const JWT_SECRET='Ashwaniisagoodboy'
const fetchuser = require('../middleware/fetchuser');


router.post('/createuser',[
    body('name','name should be minimum 3 charcater long').isLength({min:3}),
    body('email').isEmail(),
    body('password','password must be atleast 5 charaters').isLength({min:5})
] ,async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt)
    
  try {
    const user = new User({
  name: req.body.name,
  email: req.body.email,
  password: secPass
});
const data={
    user:{
        id:user.id
    }
}
    await user.save(); // wait for saving
    const authtoken=jwt.sign(data,JWT_SECRET);
    console.log(authtoken)
    res.status(201).json({ success: true, authtoken });

  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
});
// route 2 authenticate a user using post "/api/auth/login".no login required
router.post('/login',[ 
    body('email','enter a valid email').isEmail(),
    body('password','password cannot be blank').exists()
] ,async (req, res) => {
    //if there are errorrs
      const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

}
const{email,password}=req.body;
try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
     // Compare password
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    // Generate JWT token
    const data = {
      user: {
        id: user.id
      }
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, authtoken });

  }  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


})
//route3-get loggedin user details using post "/api/auth/getuser". logged inrequired

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports=router;