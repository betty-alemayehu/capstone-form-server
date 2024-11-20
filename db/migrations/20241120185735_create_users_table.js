export const up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // Primary key
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.timestamps(true, true); // Adds created_at and updated_at
  });
};

export const down = (knex) => {
  return knex.schema.dropTableIfExists("users");
};
