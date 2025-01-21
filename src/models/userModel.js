const mongoose=require("mongoose")
const userSchema=new  mongoose.Schema({
    fullName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    phone:{
        type:String,
        required: true

    },
    linkedin:{
        type:String,
        required: true
    },
    gitHub:{
        type:String,
        required: true
    },
    education:{
        type:mongoose.Schema.Types.ObjectId
    },
    project:{
        type:mongoose.Schema.Types.ObjectId
    },
    WorkExperience:{
        type:mongoose.Schema.Types.ObjectId
    }
},{timestamps:true})
const User=mongoose.model("User",userSchema);
module.exports=User