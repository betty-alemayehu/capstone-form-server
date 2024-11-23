//create_media_table.js
export const up = (knex) => {
  return knex.schema.createTable("media", (table) => {
    table.increments("id").primary();
    table.integer("progression_id").unsigned().notNullable();
    table
      .foreign("progression_id")
      .references("id")
      .inTable("progressions")
      .onDelete("CASCADE");
    table.string("custom_media").notNullable();
    table.string("caption_feedback").nullable();
    table.timestamps(true, true);
  });
};

export const down = (knex) => {
  return knex.schema.dropTableIfExists("media");
};
// If you delete a progression, all associated rows in the media table will be removed because of ON DELETE CASCADE.
