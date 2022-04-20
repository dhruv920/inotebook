const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET ='Dhruvisclassy';
const fetchuser = require("../middleware/fetchUser");

//route 1 Creating a login user using POST: "api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 5 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password Must be Moe than 3 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
    let user = await User.findOne({success, email: req.body.email });

    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry a user with email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt); 

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const Data = {
      user: {
        id:user.id
      }
    }
    const authToken = jwt.sign(Data, JWT_SECRET);
    success = true;
    res.json({success, authToken});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal some error occured");
  }

  }
);

//route 2 get login user using POST: "api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "password can not be Blank").exists()
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{email,password} = req.body;

    try {
      let success = false;
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"PLease try to login with correct credentials"});
      }

      const passwordCompare = await bcrypt.compare(password,user.password);

      if(!passwordCompare){
        return res.status(400).json({error:"PLease try to login with correct credentials"});
      }

      const Data = {
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(Data, JWT_SECRET);
      success = true;
      res.json({success, authToken });
    
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal some error occured");
    }

  })

//route 2 get loggedin user detais using POST: "api/auth/getuser" login required
router.post("/getuser", fetchuser ,async (req, res) => {

try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  console.log(user);
  res.send(user)
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal some error occured");
}

})


module.exports = router;
