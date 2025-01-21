const express = require("express");
const {
  createWorkExperience,
  getWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} = require("../controllers/workExperienceController");

const router = express.Router();

router.post("/:userId", createWorkExperience); 
router.get("/:id", getWorkExperience); 
router.put("/:userId/:workExperienceId", updateWorkExperience); 
router.delete("/:userId/:WorkExperience", deleteWorkExperience); 

module.exports = router;
