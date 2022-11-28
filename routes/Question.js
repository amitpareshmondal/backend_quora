const express=require("express");
const router=express.Router();
const questionDB=require("../models/Questions");
const author=require("../middleware");
const tagsModel=require("../models/Tags");
router.get("/tags/:id",async(req,res)=>{
      const id=req.params.id;
      res.send(id);
    //   const tags=await tagsModel.find({tags: { $elemMatch: {$eq: id} }})
    //   if(!tags){
    //     res.send("Fuck off kuch nai yaha peh");
    //   }
})
router.get("/one/:id",async(req,res)=>{
    try{
        const question=await questionDB.findById(req.params.id);
        res.send(question);
    }
    catch(err){
        console.log(err);
        res.send("Kuch toh gadbad hai");
    }
})
router.post("/",author(),async (req,res)=>{
    //abhi yaha peh middleware function se apne paas user ka data aaya 
    // iss data ko use karke apan log question asked by meh user ke id daalna hai
    //aur user ke andar yeh question ke id ghuasana hai
    console.log(req.user);
    try{
        await questionDB.create({
            questionName:req.body.questionName,
            questionUrl:req.body.questionUrl,
            username:req.user.username
        }).then(()=>{
            res.status(201).send({
                status:true,
                message:"Question Added "
            })
        }).catch((err)=>{
            res.status(400).send({
                status:false,
                message:"Bad Request"
            })
        })
    }
    catch(e){
      res.status(500).send({
        status:false,
        message:"error while adding questions"
      })
    }
})
router.get("/",async(req,res)=>{
 try{
 await questionDB.aggregate([{
    $lookup:{
        from:"answers",
        localField:"_id",
        foreignField:"questionId",
        as:"allAnswers"
    }
 }]).exec().then((doc)=>{
    res.status(200).send(doc)
 }).catch((error)=>{
    res.status(500).send({
        status:false,
        message:"Unable to get the question details"
    })
 })
 }catch(err){
   res.status(500).send({
    status:false,
    message:"unexpected Error"
   })
 }
})
module.exports=router;