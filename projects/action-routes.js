const express = require("express");

const Actions = require("../data/helpers/action-model");

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

module.exports = router;
