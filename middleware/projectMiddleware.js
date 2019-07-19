const Project = require("../data/helpers/projects-model");
module.exports = {
  validateProject,
  validateProjectId
};
async function validateProject(req, res, next) {
  const { name, description } = req.body;
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "Missing project data" });
  }
  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }
  next();
}

async function validateProjectId(req, res, next) {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ message: "IDs should be a numerical value" });
  }

  const project = await Project.getProjectById(id);

  if (!project) {
    return res.status(404).json({ message: "Project ID does not exist" });
  } else {
    req.project = project;
    next();
  }
}
