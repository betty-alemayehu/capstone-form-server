//add_user_progression_trigger.js
export async function up(knex) {
  await knex.raw(`
    CREATE TRIGGER after_user_insert
    AFTER INSERT ON users
    FOR EACH ROW
    BEGIN
      -- Insert a progression for each pose
      INSERT INTO progressions (user_id, pose_id, status, created_at, updated_at)
      SELECT NEW.id, id, 'In Progress', NOW(), NOW()
      FROM poses;
    END;
  `);
}

export async function down(knex) {
  await knex.raw(`
    DROP TRIGGER IF EXISTS after_user_insert;
  `);
}
