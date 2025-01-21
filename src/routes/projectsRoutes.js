const express = require("express");
const {
  createProject,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectsController");

const router = express.Router();

router.post("/:userId", createProject); 
router.get("/:id", getProject); 
router.put("/:userId/:projectId", updateProject); 
router.delete("/:userId/:projectId", deleteProject);

module.exports = router;
