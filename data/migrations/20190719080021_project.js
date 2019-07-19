exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl
        .text("project_name", 128)
        .unique()
        .notNullable();
      tbl
        .text("description", 256)
        .unique()
        .notNullable();
      tbl.boolean("is_completed");
    })
    .createTable("actions", tbl => {
      tbl.increments();
      tbl
        .text("description", 256)
        .unique()
        .notNullable();
      tbl
        .text("notes", 256)
        .unique()
        .notNullable();
      tbl.boolean("is_completed");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("projects").dropTableIfExists("actions");
};
