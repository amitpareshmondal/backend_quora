const express=require("express");
const router=express.Router();
const userSchema=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const config=require("../config");
router.post("/register",async(req,res)=>{
    try{
        var hashedPassword=await bcrypt.hashSync(req.body.password,8);
        await userSchema.create({
         name:req.body.name,
         email:req.body.email,
         password:hashedPassword,
         username:req.body.username
        }).then((user)=>{
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).send({ auth: true, token: token });
        })
    }
    catch(err){
        res.status(500).send("There was a problem registering the user");
        console.log(err);
    }

})
router.get("/me",(req,res)=>{
    var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    userSchema.findById(decoded.id, { password: 0 },function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      
      res.status(200).send(user);
    });
  });
})
router.post("/login",(req,res)=>{
  userSchema.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    
    res.status(200).send({ auth: true, token: token });
  });
})
module.exports = router;
