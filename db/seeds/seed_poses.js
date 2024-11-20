export const seed = async (knex) => {
  await knex("poses").del(); // Clear existing data

  await knex("poses").insert([
    {
      english_name: "Butterfly",
      sanskrit_name: "Baddha Koṇāsana",
      pose_description:
        "In sitting position, bend both knees and drop the knees to each side...",
      pose_benefits:
        "Opens the hips and groins. Stretches the shoulders, rib cage, and back...",
      url_svg: "https://example.com/butterfly.svg",
      url_png: "https://example.com/butterfly.png",
    },
    {
      english_name: "Downward Dog",
      sanskrit_name: "Adho Mukha Svanasana",
      pose_description: "Begin on your hands and knees...",
      pose_benefits: "Strengthens the arms, legs, and back...",
      url_svg: "https://example.com/downwarddog.svg",
      url_png: "https://example.com/downwarddog.png",
    },
  ]);
};
