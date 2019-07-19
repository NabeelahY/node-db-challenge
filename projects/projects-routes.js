const express = require("express");

const Projects = require("../data/helpers/projects-model");

const router = express.Router();

router.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.getProjectById(id);
    res.status(200).json(project);
  } catch (err) {
      console.log(err);
    res.status(500).json({
      message: "Failed to get project"
    });
  }
});

module.exports = router;
