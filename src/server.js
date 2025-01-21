const express = require("express");
const connectDB = require("./config/db");  
const config = require("./config/config"); 

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectsRoutes");
const educationRoutes = require("./routes/educationRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();


app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/resume", resumeRoutes);


connectDB();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
