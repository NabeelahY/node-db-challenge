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

router.put("/:id", actionMiddleware.validateActionId, async (req, res) => {
  try {
    const { body, params } = req;
    const editedAction = await Actions.editAction(params.id, body);
    res.status(201).json(editedAction);
  } catch (error) {
    res.status(500).json({
      message: "Failed to edit action"
    });
  }
});

router.delete("/:id", actionMiddleware.validateActionId, async (req, res) => {
  try {
    const { id } = req.params;
    await Actions.deleteAction(id);
    res.status(200).json({ deleted_action: req.action });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the action"
    });
  }
});

module.exports = router;
