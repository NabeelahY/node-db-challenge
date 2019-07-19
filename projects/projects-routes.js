const express = require("express");

const Projects = require("../data/helpers/projects-model");

const router = express.Router();

router.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.getProjectById(id);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get project"
    });
  }
});

router.post("/projects", async (req, res) => {
  try {
    // const { project_name, description } = req.body;
    const newProject = await Projects.addProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create project"
    });
  }
});

module.exports = router;
