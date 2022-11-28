const config=require("./config");
const jwt=require("jsonwebtoken");
const userSchema=require("./models/User");
module.exports=()=>{
 return (req,res,next)=>{
    
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      userSchema.findById(decoded.id, { password: 0 },function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        req.user=user;
        next();
        //res.status(200).send(user);
      });
    });
 }
}