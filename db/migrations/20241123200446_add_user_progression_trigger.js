//add_user_progression_trigger.js
export async function up(knex) {
  await knex.raw(`
    CREATE TRIGGER after_user_insert
    AFTER INSERT ON users
    FOR EACH ROW
    BEGIN
      -- Insert a progression for each pose
      INSERT INTO progressions (user_id, pose_id, status, created_at, updated_at)
      SELECT NEW.id, id, 'Not Attempted', NOW(), NOW()
      FROM poses;

      -- Insert corresponding media entries using pose's url_png
      INSERT INTO media (progression_id, custom_media, created_at, updated_at)
      SELECT
        p.id,
        pos.url_png,
        NOW(),
        NOW()
      FROM progressions p
      JOIN poses pos ON p.pose_id = pos.id
      WHERE p.user_id = NEW.id;
    END;
  `);
}

export async function down(knex) {
  await knex.raw(`
    DROP TRIGGER IF EXISTS after_user_insert;
  `);
}
