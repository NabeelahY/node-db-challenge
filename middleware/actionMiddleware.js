const Action = require("../data/helpers/action-model");
const Project = require("../data/helpers/projects-model");
module.exports = {
  validateAction,
  validateActionId
};
async function validateAction(req, res, next) {
  const { description, notes } = req.body;

  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "Missing action data" });
  }

  if (!description || !notes) {
    return res
      .status(400)
      .json({ message: "Description and notes are required" });
  }
  next();
}

async function validateActionId(req, res, next) {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res
        .status(400)
        .json({ message: "IDs should be a numerical value" });
    }

    const action = await Action.get(id);
    if (!Object.keys(action).length) {
      return res.status(404).json({ message: "Action ID does not exist" });
    } else {
      req.action = action;
      next();
    }
  } catch (error) {
    return res.status(400).json({ message: "Sever error" });
  }
}
