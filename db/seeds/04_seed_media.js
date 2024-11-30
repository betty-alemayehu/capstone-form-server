//03_seed_media.js
export const seed = async (knex) => {
  // Deletes ALL existing entries
  await knex("media").del();

  // Inserts seed entries
  await knex("media").insert([
    {
      id: 1,
      progression_id: 1,
      user_id: 1,
      pose_id: 1,
      custom_media: "/uploads/1_1.png",
      caption_feedback: null,
      created_at: "2024-11-28 22:54:48",
      updated_at: "2024-11-28 22:54:48",
    },
    {
      id: 2,
      progression_id: 3,
      user_id: 1,
      pose_id: 3,
      custom_media: "/uploads/1_3.png",
      caption_feedback: null,
      created_at: "2024-11-28 22:55:24",
      updated_at: "2024-11-28 22:55:24",
    },
    {
      id: 3,
      progression_id: 6,
      user_id: 1,
      pose_id: 6,
      custom_media: "/uploads/1_6.png",
      caption_feedback: null,
      created_at: "2024-11-28 22:55:36",
      updated_at: "2024-11-28 22:55:36",
    },
    {
      id: 5,
      progression_id: 38,
      user_id: 1,
      pose_id: 38,
      custom_media: "/uploads/1_38.jpg",
      caption_feedback: null,
      created_at: "2024-11-28 23:05:23",
      updated_at: "2024-11-28 23:05:23",
    },
    {
      id: 6,
      progression_id: 9,
      user_id: 1,
      pose_id: 9,
      custom_media: "/uploads/1_9.JPG",
      caption_feedback: null,
      created_at: "2024-11-28 23:09:08",
      updated_at: "2024-11-28 23:09:08",
    },
    {
      id: 8,
      progression_id: 11,
      user_id: 1,
      pose_id: 11,
      custom_media: "/uploads/1_11.png",
      caption_feedback: null,
      created_at: "2024-11-28 23:12:22",
      updated_at: "2024-11-28 23:12:22",
    },
    {
      id: 9,
      progression_id: 12,
      user_id: 1,
      pose_id: 12,
      custom_media: "/uploads/1_12.jpeg",
      caption_feedback: null,
      created_at: "2024-11-28 23:15:11",
      updated_at: "2024-11-28 23:15:11",
    },
    {
      id: 12,
      progression_id: 31,
      user_id: 1,
      pose_id: 31,
      custom_media: "/uploads/1_31.jpg",
      caption_feedback: null,
      created_at: "2024-11-29 02:43:29",
      updated_at: "2024-11-29 02:43:29",
    },
  ]);
};
