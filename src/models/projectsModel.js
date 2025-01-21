  const mongoose=require("mongoose")
  const projectschema=new  mongoose.Schema({
     userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true 
     },
      projectName:{
          type:String,
          required: true
      },
      description:{
          type:String,
          unique:true,
          required: true
      },
      technologyUsed:{
          type:String,
          required: true
  
      },
      projectDate:{
          type:Date,
          required: true
      },
      link:{
         type:String,
         required: true
     }
  },{timestamps:true})
  const Project=mongoose.model("Project",projectschema);
  module.exports=Project
           