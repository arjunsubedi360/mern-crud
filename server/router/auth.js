const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const authenticate = require("../middleware/authenticate");

// require('../db/conn');

const User = require("../models/userSchema");


router.get('/', (req,res) => {
    res.send(`Hello world from the server router js`);
}); 

// Using Promises
// router.post('/register',(req,res) => {

//    const { name, email, phone, work, password, cpassword} = req.body;

//      if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: "please fillup all the field"});
//      }

//      User.findOne({email: email})
//      .then((userExist) => {
//       if(userExist) {
//           return res.status(422).json({error: "User already exist"});
//       }  
//       const user = new User({ name, email, phone, work, password, cpassword});

//       user.save().then(() => {
//           res.status(201).json({message: "user registered succesfully"});
//       }).catch((err) => res.status(500).json({error:"Failed to Register" }));
//      }).catch(err => {console.log(err);});

//      });



//Registration of User  ***using async*** method
router.post('/register', async (req,res) => {

   const { name, gender, email, phone, password} = req.body;
     if(!name || !gender || !email || !phone || !password){
        return res.status(422).json({error: "please fillup all the field"});
     }

     try{

      const userExist =  await User.findOne({email: email});

        if(userExist) {
          return res.status(422).json({error: "Email already exist"});
      
       }else{

           const user = new User({ name, gender, email, phone, password});
      
         //   hashing password before putting into database

         const userRegister =  await user.save();
         console.log(userRegister);
         res.status(201).json({message: "user registered succesfully"}); 
    }

     

    //  if(userRegister){
    //     res.status(201).json({message: "user registered succesfully"}); 
    //  }else{
    //     res.status(500).json({error:"Failed to Register" })
    //  }
     
 } catch(err){
         console.log(err);
     }
});


// login route
router.post('/signin', async (req, res) => {
    
try{
    let token;
    const {email, password} = req.body;
    console.log(req.body);

    if(!email || !password)
    
    {
        return res.status(400).json({erorr: "Input fields cannot be empty."});
       
    }
const userLogin = await User.findOne({ email:email });

  console.log(userLogin);

if(userLogin){

const isMatch = await bcrypt.compare(password, userLogin.password);

//JWT token
const token = await userLogin.generateAuthToken();
console.log(token);

res.cookie("jwtoken", token, {
    expires:new Date(Date.now() + 25892000000),
    httpOnly:true 
});

if(!isMatch){
    //password not match
    res.status(400).json({error: "Please Enter Correct Username or Password"});
}else{
    res.json({message: "User SignIn Succesfully."});
}
}else{
    res.json({message: "Please Enter Correct Username or Password."});
}


 }catch(err){
        console.log(err);
    }
 });

//  about us page
router.get('/about', authenticate, (req,res) => {
    console.log("Hello my About");
    res.send('This is About  page');
});

module.exports = router;