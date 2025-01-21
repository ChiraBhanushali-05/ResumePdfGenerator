const mongoose = require("mongoose");

const User=require("../models/userModel");
const Education=require("../models/educationModel")
const createEducation=async(req,res)=>{
  
   try {
       const {degree, institution, location, startDate, endDate, gpa, coursework}=req.body;
       const {userId}=req.params;
       const newEducation=new Education({userId,    degree, institution, location, startDate, endDate, gpa, coursework})
       await newEducation.save();
       await User.findByIdAndUpdate(userId,{
        $push:{education:newEducation._id}
       })
       res.status(201).json({message:"Eduaction Details sucessfully added ",newEducation})
   }catch(error){
       res.status(500).json({message:"Error adding education",error});
   }

};
const getEducation=async(req,res)=>{
    try{
       const userid=req.params.id;
       if (!mongoose.Types.ObjectId.isValid(userid)) {
        return res.status(400).json({ message: "Invalid userId format" });
      }
  
      const EducationList = await Education.findOne ({ userId: new mongoose.Types.ObjectId(userid) });
  
       if(!EducationList || EducationList.length===0){
           return res.status(404).json({message:"No Education Details not found"});
       }res.status(200).json(EducationList);
    }catch(error){
       res.status(500).json({message:"Error retriving Education Details",error:error.message})
    }
}
const updateEducation=async(req,res)=>{
   try{
      const {userId,educationId}=req.params
      const {degree, institution, location, startDate, endDate, gpa, coursework}=req.body;
       const updatedEducation=await Education.findByIdAndUpdate(educationId,{degree, institution, location, startDate, endDate, gpa, coursework})
       if (!updatedEducation){
           return res.status(404).json({message:"Education not found"});
       }res.status(200).json({message:"Education Updated Successfully",updatedEducation})
       
   }catch(error){
       res.status(500).json({message:"Error updating Education",error})
   }
}
const deleteEducation=async(req,res)=>{
   try{
    const {userId,educationId}=req.params
       const deleteEducation=await Education.findByIdAndDelete(educationId)
       if (!deleteEducation){
           return res.status(404).json({message:"Education not found"})
       }res.status(200).json({message:"Education Deleted sucessfully"})
       
   }catch(error){
    res.satus(500).json({message:"Error Deleting Education",error})       
   }
}
module.exports={createEducation,getEducation,updateEducation,deleteEducation}