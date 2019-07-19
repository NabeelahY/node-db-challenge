const db = require("../dbConfig");
const mappers = require("./mappers");

const getProjectActions = projectId => {
  return db("actions")
    .where("project_id", projectId)
    .then(actions => actions.map(action => mappers.actionToBody(action)));
};

const getProjectById = id => {
  let query = db
    .select("*")
    .from("projects")
    .where({ id })
    .first();
  const promises = [query, getProjectActions(id)];
  return Promise.all(promises).then((results) => {
    let [project, actions] = results;

    if (project) {
      project.actions = actions;

      return mappers.projectToBody(project);
    } else {
      return null;
    }
  });
};

module.exports = {
  getProjectById,
  getProjectActions
};
