const express = require("express");
const { generateResumePdf } = require("../controllers/resumepdfController");
const router = express.Router();

router.get("/:userId", generateResumePdf);

module.exports = router;
