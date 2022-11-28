const mongoose=require("mongoose");
const AnswerSchema= new mongoose.Schema({
    answer:String,
    username:{
        type:String,
        required:true
    },
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"questions"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model("Answer",AnswerSchema);