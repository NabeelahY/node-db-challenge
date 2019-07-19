exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("actions")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("actions").insert([
        {
          description: "Get wood",
          notes: "Wood should be dry",
          is_completed: false,
          project_id: 3
        },
        {
          description: "Learn JS",
          notes: "Register for a course online",
          is_completed: false,
          project_id: 1
        },
        {
          description: "Find out price range for hosting",
          notes: "Compare prices from multiple platforms",
          is_completed: true,
          project_id: 2
        }
      ]);
    });
};
