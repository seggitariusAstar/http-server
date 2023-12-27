const express=require("express")
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const app=express();
app.use(express.json());
app.listen(3000,()=>{

  console.log("server is running at the port 3000")
})
mongoose.connect("mongodb+srv://admin:Anirudhtyagi@cluster0.tqw6gpy.mongodb.net/user-app")

const Users=mongoose.model('Users',{

 name:String,
  email:String,
  password:String

  
});
app.post("/signup", async function(req,res){
const username=req.body.username;
  const password=req.body.password;
  const name=req.body.name;
 const existingUser=await Users.findOne({email:username});

  if(existingUser){

    return res.status(400).send("Username already exists");
  }
 
  const user=new Users({
    name:name,
     email:username,
     password:password                 });

  user.save();
    res.json({

      "msg":"user created successfully"
    })
  
})
