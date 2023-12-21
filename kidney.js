
const users=[{
 name:"john",
 kidneys:[{
    healthy:false
 }]

 

}];
const express=require("express");
const app=express();
app.use(express.json());
app.get("/",function(req,res){

const johnkidney=users[0].kidneys;
const numberofjohnkidney=johnkidney.length;
let numberofHealthykidneys=0;
for(let i=0;i<johnkidney.length;i++){
     
     if(johnkidney[i].healthy){
        numberofHealthykidneys=numberofHealthykidneys+1;
     }     
}

const numberofUnhealthykidney=numberofjohnkidney-numberofHealthykidneys;
res.json({
numberofjohnkidney,
numberofHealthykidneys,
numberofUnhealthykidney


})
})
app.post("/",function(req,res){
  
  const ishealthy=req.body.ishealthy;
  users[0].kidneys.push({
    healthy: ishealthy
  })
  res.json({
    msg:"Done"
  })

})
app.put("/",function(req,res){

 for(let i=0;i<users[0].kidneys.length;i++){
      
    users[0].kidneys[i].healthy=true;
 } 
 res.json({});
 


})
app.delete("/",function(req,res){

    let isunhealthykidneyavailable=false
  
      for(let i=0;i<users[0].kidneys.length;i++){
              
         if(users[0].kidneys.healthy==false){
            isunhealthykidneyavailable=true;
         }
      }

      if(isunhealthykidneyavailable){


        const newkidney=[];

        for(let i=0;i<users[0].kidneys.length;i++){
       
           if(users[0].kidneys[i].healthy){
                 
               newkidney.push({
                   healthy: true
               })
       
           }
           
        }
      
        users[0].kidneys=newkidney;
        res.json({
            msg:"done"
         })
          
      }

      else{
        
        res.status(411).json({
            msg:"You have no bad kidney"
        });

      }


 
 

})
app.listen(3002,function(){
 
console.log("the port is listening at"+3002);
});