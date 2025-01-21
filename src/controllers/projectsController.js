const User=require("../models/userModel");
const project=require("../models/projectsModel");
const mongoose=require("mongoose")
const createProject=async(req,res)=>{
  
   try {
       const {projectName,description,technologyUsed,projectDate,link
        }=req.body;
       const {userId}=req.params;
       const newProject=new project({userId,projectName,description,technologyUsed,projectDate,link})
       await newProject.save();
       await User.findByIdAndUpdate(userId,{
        $push:{project:newProject._id}
       })
       res.status(201).json({message:"Project Details sucessfully added ",newProject})
   }catch(error){
       res.status(500).json({message:"Error adding project",error});
   }

};
const getProject=async(req,res)=>{
    try{
       const userid=req.params.id;
       if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(400).json({ message: "Invalid userId format" });
      }
       const projectList=await project.findOne({ userId: new mongoose.Types.ObjectId(userid)});
       if(!projectList || projectList.length===0){
           return res.status(404).json({message:"No Project Details not found"});
       }res.status(200).json(projectList);
    }catch(error){
       res.status(500).json({message:"Error retriving Project Details",error:error.message})
    }
}
const updateProject=async(req,res)=>{
   try{
      const {userId,projectId}=req.params
      const {projectName,description,technologyUsed,projectDate,link}=req.body;
       const updatedProject=await Project.findByIdAndUpdate(projectId,{projectName,description,technologyUsed,projectDate,link})
       if (!updatedProject){
           return res.status(404).json({message:"Project not found"});
       }res.status(200).json({message:"Project Updated Successfully",Project})
       
   }catch(error){
       res.status(500).json({message:"Error updating Project",error})
   }
}
const deleteProject=async(req,res)=>{
   try{
    const {userId,projectId}=req.params
       const deleteProject=await project.findByIdAndDelete(projectId)
       if (!deleteProject){
           return res.status(404).json({message:"Project not found"})
       }res.status(200).json({message:"Project Deleted sucessfully"})
       
   }catch(error){
    res.status(500).json({message:"Error Deleting Project",error:error.message})       
   }
}
module.exports={createProject,getProject,updateProject,deleteProject}