export const seed = async (knex) => {
  await knex("media").del(); // Clear existing data

  await knex("media").insert([
    {
      progression_id: 1,
      custom_media:
        "https://cdn.yogajournal.com/wp-content/uploads/2021/10/YJ_Mountain-Pose_Andrew-Clark_2400x1350.png",
      caption_feedback: "Great posture!",
    },
    {
      progression_id: 1,
      custom_media:
        "https://cdn.yogajournal.com/wp-content/uploads/2022/01/Tree-Pose_Andrew-Clark.jpg",
      caption_feedback:
        "Try to straighten your arms, place your feet side by side",
    },
  ]);
};
