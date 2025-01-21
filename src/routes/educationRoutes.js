  const express = require("express");
  const {
    createEducation,
    getEducation,
    updateEducation,
    deleteEducation,
  } = require("../controllers/educationController");

  const router = express.Router();

  router.post("/:userId", createEducation); 
  router.get("/:id", getEducation); 
  router.put("/:userId/:educationId", updateEducation); 
  router.delete("/:userId/:educationId", deleteEducation); 

  module.exports = router;
