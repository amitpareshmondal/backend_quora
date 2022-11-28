const express=require("express");
const app=express();
const cors=require("cors");
const bodyParser=require("body-parser");
const PORT=5000;
const db=require("./db");
const router=require("./routes/index");
db.connect();
// middleware
app.use(bodyParser.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}));


//cors
app.use((req,res,next)=>{ 
    //basically jitna mujhe samjha hum log yeh likh ke kahi se bhi request ko allow kar rahe hai
    //aur agar yeh headers wagere sahi hote hai toh ek callback function next ko hum log call kar rahe hoge
    req.header("Access-Control-Allow-Origin","*");
    req.header("Access-Control-Allow-Origin","*");
    next();
})

app.use(cors());
//routes

app.use("/api",router);
//server Listening 
app.listen(process.env.PORT||PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})
