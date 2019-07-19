const db = require("../dbConfig");
const mappers = require("./mappers");

const getAllActions = () => {
  let query = db("actions");
  return query.then(actions => {
    return actions.map(action => mappers.actionToBody(action));
  });
};

const addAction = (action, projectId) => {
  return db("actions")
    .insert(action)
    .where("project_id", projectId);
};

module.exports = {
  addAction,
  getAllActions
};
