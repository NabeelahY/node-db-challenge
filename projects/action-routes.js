const express = require("express");

const Actions = require("../data/helpers/action-model");

const { actionMiddleware } = require("../middleware");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.getAllActions();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get actions"
    });
  }
});

router.get("/:id", actionMiddleware.validateActionId, async (req, res) => {
  try {
    const { id } = req.params;
    const action = await Actions.getActionById(id);
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get action"
    });
  }
});

module.exports = router;
