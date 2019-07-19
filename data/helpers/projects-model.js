const db = require("../dbConfig");
const mappers = require("./mappers");

const getAllProjects = () => {
  let query = db("projects");
  return query.then(projects => {
    return projects.map(project => mappers.projectToBody(project));
  });
};
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
  return Promise.all(promises).then(results => {
    let [project, actions] = results;

    if (project) {
      project.actions = actions;

      return mappers.projectToBody(project);
    } else {
      return null;
    }
  });
};
const addProject = project => {
  return db("projects")
    .insert(project)
    .then(([id]) => getProjectById(id));
};

const editProject = (id, project) => {
  return db("projects")
    .update(project)
    .where({ id })
    .then(count => (count > 0 ? getProjectById(id) : null));
};

module.exports = {
  getAllProjects,
  getProjectById,
  getProjectActions,
  addProject,
  editProject
};
