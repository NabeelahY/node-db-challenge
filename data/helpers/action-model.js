const db = require("../dbConfig");

const addAction = (action, projectId) => {
  return db("actions")
    .insert(action)
    .where("project_id", projectId);
};

module.exports = {
  addAction
};
