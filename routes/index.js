const express=require("express");
const router=express.Router();
const questionRouter=require("./Question");
const AnswerRouter=require("./Answer");
const AuthRouter=require("./Auth")
router.get("/",(req,res)=>{
    res.send("This API is reserved for Quora");
})
router.use("/questions",questionRouter);
router.use("/answers",AnswerRouter);
router.use("/auth",AuthRouter);
module.exports=router;