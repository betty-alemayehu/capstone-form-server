export const up = (knex) => {
  return knex.schema.createTable("poses", (table) => {
    table.increments("id").primary(); // Primary key
    table.string("english_name").notNullable();
    table.string("sanskrit_name_adapted").nullable();
    table.string("sanskrit_name").nullable();
    table.string("translation_name").nullable();
    table.text("pose_description").notNullable();
    table.text("pose_benefits").nullable();
    table.string("url_svg").nullable();
    table.string("url_png").nullable();
    table.string("url_svg_alt").nullable();
    table.timestamps(true, true); // Adds created_at and updated_at
  });
};

export const down = (knex) => {
  return knex.schema.dropTableIfExists("poses");
};

// If you delete a pose, all progressions referencing that pose will be deleted automatically due to the ON DELETE CASCADE in the progressions table.
// No cascading logic is needed in the poses table itself.
