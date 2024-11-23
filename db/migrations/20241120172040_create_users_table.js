//create_users_table.js
export const up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // Primary key
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table
      .string("profile_picture", 255)
      .nullable()
      .comment("URL to user profile picture");
    table.timestamps(true, true); // created_at and updated_at
  });
};

export const down = (knex) => {
  return knex.schema.dropTableIfExists("users");
};

// If you delete a user, all associated rows in the progressions table will be removed automatically because of the ON DELETE CASCADE in the progressions table.
// No cascading logic is needed in the users table itself.
