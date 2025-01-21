 const mongoose=require("mongoose")
 const educationschema=new  mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    institution: {
        type: String,
        required: true,
        
      },
      location: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: true,
      },
      gpa: {
        type: String,
        required: true,
      },
      coursework: [
        {
          type: String,
          required: true,
        },
      ],
    
 },{timestamps:true})
 const Education=mongoose.model("Education",educationschema);
 module.exports=Education
