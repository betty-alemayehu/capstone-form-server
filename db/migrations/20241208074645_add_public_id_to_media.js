//add_public_id_to_media.js
export async function up(knex) {
  return knex.schema.table("media", (table) => {
    table.string("public_id").notNullable(); // Add public_id column
  });
}

export async function down(knex) {
  return knex.schema.table("media", (table) => {
    table.dropColumn("public_id"); // Rollback
  });
}
