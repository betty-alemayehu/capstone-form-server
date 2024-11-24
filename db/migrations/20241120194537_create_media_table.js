//create_media_table.js
export const up = (knex) => {
  return knex.schema.createTable("media", (table) => {
    table.increments("id").primary();

    // Foreign key: progression_id
    table.integer("progression_id").unsigned().notNullable();
    table
      .foreign("progression_id")
      .references("id")
      .inTable("progressions")
      .onDelete("CASCADE");

    // Foreign key: user_id
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    // Foreign key: pose_id
    table.integer("pose_id").unsigned().notNullable();
    table
      .foreign("pose_id")
      .references("id")
      .inTable("poses")
      .onDelete("CASCADE");

    // Field for storing relative file path
    table.string("custom_media").notNullable();

    // Optional field for captions/feedback
    table.string("caption_feedback").nullable();

    // Timestamps: created_at and updated_at
    table.timestamps(true, true);
  });
};

export const down = (knex) => {
  return knex.schema.dropTableIfExists("media");
};

// If you delete a progression, all associated rows in the media table will be removed because of ON DELETE CASCADE.
