export const up = (knex) => {
  return knex.schema.createTable("progressions", (table) => {
    table.increments("id").primary(); // Primary key
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.integer("pose_id").unsigned().notNullable();
    table
      .foreign("pose_id")
      .references("id")
      .inTable("poses")
      .onDelete("CASCADE");
    table.enum("status", ["In Progress", "Completed"]).defaultTo("In Progress");
    table.text("custom_media").nullable();
    table.timestamps(true, true); // Adds created_at and updated_at
  });
};

export const down = (knex) => {
  return knex.schema.dropTableIfExists("progressions");
};
