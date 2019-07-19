exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("projects")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("projects").insert([
        {
          project_name: "Create Ecommerce website",
          description: "Lorem ipsum spladerdasssh",
          is_completed: true
        },
        {
          project_name: "Deploy project on AWS",
          description: "Lorem ipsum spladerdasssh1",
          is_completed: false
        },
        {
          project_name: "Construct trehouse",
          description: "Lorem ipsum spladerdasssh2",
          is_completed: true
        }
      ]);
    });
};
