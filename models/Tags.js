const mongoose=require("mongoose");
const TagSchema=new mongoose.Schema({
    tags:[String]
})
module.exports=mongoose.model("Tags",TagSchema);