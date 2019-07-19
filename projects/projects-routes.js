const express = require("express");

const Projects = require("../data/helpers/projects-model");
const Actions = require("../data/helpers/action-model");

const { projectMiddleware, actionMiddleware } = require("../middleware");

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
router.get("/:id", projectMiddleware.validateProjectId, async (req, res) => {
  try {
    res.status(200).json(req.project);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get project"
    });
  }
});

router.post("/", projectMiddleware.validateProject, async (req, res) => {
  try {
    const newProject = await Projects.addProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create project"
    });
  }
});

router.post(
  "/:id/actions",
  projectMiddleware.validateProjectId,
  actionMiddleware.validateAction,
  async (req, res) => {
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
  }
);

router.put("/:id", async (req, res) => {
  try {
    const { body, params } = req;
    const editedProject = await Projects.editProject(params.id, body);
    res.status(201).json(editedProject);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add project"
    });
  }
});

module.exports = router;
