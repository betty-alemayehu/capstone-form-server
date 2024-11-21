export const seed = async (knex) => {
  // Clear existing data
  await knex("progressions").del();

  // Insert seed data
  await knex("progressions").insert([
    {
      id: 1,
      user_id: 1,
      pose_id: 1,
      status: "Completed", // Use boolean or string based on schema?
    },
    {
      id: 2,
      user_id: 2,
      pose_id: 1,
      status: "In Progress",
    },
  ]);
};
