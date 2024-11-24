//03_seed_media.js
export const seed = async (knex) => {
  // Deletes ALL existing entries and resets AUTO_INCREMENT
  await knex.raw("TRUNCATE TABLE media");

  // Inserts seed entries
  await knex("media").insert([
    {
      progression_id: 1,
      custom_media:
        "https://cdn.yogajournal.com/wp-content/uploads/2021/10/Boat-Pose_Andrew-Clark_2400x1350.jpeg",
      caption_feedback: "You can see this feedback",
      created_at: "2024-11-24 00:00:00",
      updated_at: "2024-11-24 00:00:00",
    },
    {
      progression_id: 1,
      custom_media:
        "https://www.ekhartyoga.com/media/image/articles/Boat-pose-Navasana-Ekhart-Yoga-800x800.jpg",
      caption_feedback: "Test 2",
      created_at: "2024-11-23 00:00:00",
      updated_at: "2024-11-23 00:00:00",
    },
    {
      progression_id: 2,
      custom_media:
        "https://images.ctfassets.net/6ilvqec50fal/2uwTxoguedLgrA8jNV2sLr/c35d42b0988294d8ad0c77b5d462e595/Stocksy-woman-half-boat-pose-224.jpg",
      caption_feedback: "I hope this works!",
      created_at: "2024-11-22 00:00:00",
      updated_at: "2024-11-22 00:00:00",
    },
  ]);
};
