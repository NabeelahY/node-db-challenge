const express = require("express");

const Projects = require("../data/helpers/projects-model");
const Actions = require("../data/helpers/action-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.getAllProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get projects"
    });
  }
});
router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const newProject = await Projects.addProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create project"
    });
  }
});

router.post("/:id/actions", async (req, res) => {
  try {
    const { body, params } = req;
    const newAction = { ...body, project_id: params.id };
    await Actions.addAction(newAction, params.id);
    res.status(201).json(newAction);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add action"
    });
  }
});

module.exports = router;
