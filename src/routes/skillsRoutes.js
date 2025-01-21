const express = require("express");
const {
  createSkills,
  getSkills,
  updateSkills,
  deleteSkills,
} = require("../controllers/skillsController");

const router = express.Router();

router.post("/:userId", createSkills); 
router.get("/:id", getSkills); 
router.put("/:userId/:skillsId", updateSkills); 
router.delete("/:userId/:skillsId", deleteSkills);

module.exports = router;
