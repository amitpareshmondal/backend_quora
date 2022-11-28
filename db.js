const dotenv=require("dotenv");
const mongoose=require("mongoose");
dotenv.config();
module.exports.connect=()=>{
    mongoose.connect(process.env.DB,{
        usenewUrlParser:true,
        useUnifiedTopology:true
    }).then(console.log("connected")).catch((err)=>{console.log(err);});
}
