const express=require("express");
const router=express.Router();
const answerDB=require("../models/Answers");
const middleware=require("../middleware");
router.post("/",middleware(),async(req,res)=>{
    try{
        await answerDB.create({
            answer:req.body.answer,
            questionId:req.body.questionId,
            username:req.user.username
        }).then(()=>{
            res.status(201).send({
                status:true,
                message:"answer added successfully"
            }) }).catch((e)=>{
                res.status(400).send({
                    status:false,
                    message:"Bad Request"
                })
       
    })
}
    catch(err){
        res.status(500).send({
            status:false,
            message:"Error while adding answer"
        })
    }
})
module.exports=router