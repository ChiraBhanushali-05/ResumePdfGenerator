 const User=require("../models/userModel");
 const createUser=async(req,res)=>{
    const {fullName,email,phone,linkedin,gitHub}=req.body;
    try {
        const newUser=new User({fullName,email,phone,linkedin,gitHub})
        await newUser.save();
        res.status(201).json(newUser)
    }catch(error){
        res.status(500).json({message:"Error creating user",error});
    }

 };
 const getUserById=async(req,res)=>{
     try{
        const userid=req.params.id;
        const user=await User.findById(userid);
        if(!user){
            return res.status(404).json({message:"user not found"});
        }res.status(200).json(user);
     }catch(error){
        res.status(500).json({message:"Error retriving user",error})
     }
 }
 const updateUser=async(req,res)=>{
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,req.body,)
        if (!updatedUser){
            return res.status(404).json({message:"User not found"});
        }res.status(200).json(updatedUser)
        
    }catch(error){
        res.status(500).json({message:"Error updating user",error})
    }
 }
const deleteUser=async(req,res)=>{
    try{
        const userId=req.params.id
        const deleteUser=await User.findByIdAndDelete(userId)
        if (!deleteUser){
            return res.status(404).json({message:"User not found"})
        }res.status(200).json({message:"User Deleted sucessfully"})
        
    }catch(error){
     res.satus(500).json({message:"Error Deleting User",error})       
    }
}
module.exports={createUser,getUserById,updateUser,deleteUser}