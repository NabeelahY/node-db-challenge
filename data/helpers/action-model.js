const db = require("../dbConfig");
const mappers = require("./mappers");

const getAllActions = () => {
  let query = db("actions");
  return query.then(actions => {
    return actions.map(action => mappers.actionToBody(action));
  });
};

const getActionById = id => {
  return db
    .select("*")
    .from("actions")
    .where({ id })
    .first()
    .then(action => mappers.actionToBody(action))
    .catch(err => err);
};

const addAction = (action, projectId) => {
  return db("actions")
    .insert(action)
    .where("project_id", projectId);
};

const editAction = (id, action) => {
  return db("actions")
    .update(action)
    .where({ id })
    .then(count => (count > 0 ? getActionById(id) : null));
};

const deleteAction = id => {
  return db("actions")
    .where("id", id)
    .del();
};

module.exports = {
  addAction,
  getAllActions,
  getActionById,
  editAction,
  deleteAction
};
