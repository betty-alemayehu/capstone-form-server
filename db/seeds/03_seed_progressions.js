//03_seed_progressions.js

export const seed = async (knex) => {
  // Update existing entries in the progressions table based on user_id and pose_id
  const updates = [
    {
      user_id: 1,
      pose_id: 1,
      status: "Completed",
      updated_at: "2024-11-28 22:50:00",
    },
    {
      user_id: 1,
      pose_id: 3,
      status: "Completed",
      updated_at: "2024-11-28 22:51:00",
    },
    {
      user_id: 1,
      pose_id: 6,
      status: "Completed",
      updated_at: "2024-11-28 22:52:00",
    },
    {
      user_id: 1,
      pose_id: 9,
      status: "Completed",
      updated_at: "2024-11-28 22:53:00",
    },
    {
      user_id: 1,
      pose_id: 12,
      status: "Completed",
      updated_at: "2024-11-28 22:55:00",
    },
  ];

  for (const update of updates) {
    await knex("progressions")
      .where({ user_id: update.user_id, pose_id: update.pose_id })
      .update({
        status: update.status,
        updated_at: update.updated_at,
      });
  }
};
