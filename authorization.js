const express=require("express")
const app=express();
const jwt=require("jsonwebtoken")
const jwtpassword="123456"
app.listen(3000,function(){

  console.log("the server is running at the port number:3000")
})
app.use(express.json());



const allusers=[{
 username:"harshtyagi@gmail.com",
  password:"12345",
  name:"harsh tyagi"
  
},
{
                               
  username:"anirudh@gmail.com",  
  password:"123",
  name:"Anirudh tyagi"
 },
{
  username:"aditya@gmail.com",  
  password:"12345555",
  name:"Aditya Dubey"             
  }               
];

function userExists(username,password){

let userexist=false;

  for(let i=0;i<allusers.length;i++){
      if(allusers[i].username==username && allusers[i].password==password){

        userexist=true;
        break;
      }
      

 
    
  }
return userexist;

  
}

//console.log(allusers[0].username);

//const exist=userExists("harshtyagi@gmail.com","12345")
//console.log(exist);

app.post("/login",function(req,res){

 const username=req.body.username;
  const password=req.body.password;

  if(!userExists(username,password)){

   res.status(401).send("user does not exist")
    return;
 
    
  }
  var token=jwt.sign({username:username},jwtpassword);
  return res.json({
    token,
  });
 
  
});

app.get("/users",function(req,res){

const token=req.headers.authorization
const decoded=jwt.verify(token,jwtpassword);
  const username=decoded.username;

  res.json({
    users:allusers.filter(function(value){
       if(value.username==username){
        return false  }  
      else {
        return true;}
    
  })


  })
})
  
