const mongoose=require("mongoose");
const QuestionSchema= new mongoose.Schema({
    //askedBy username
    //askedBy ID
    questionName:String,
    questionUrl:String,
    username:String,
    createdAt:{
        type:Date,
        default:Date.now()
    },
    answers:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answers"
    }
     // tags:{
    //     type:[String],
    //     required:true
    // }
})
module.exports=mongoose.model("Questions",QuestionSchema);