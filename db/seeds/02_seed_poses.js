export const seed = async (knex) => {
  await knex("poses").del(); // Clear existing data

  await knex("poses").insert([
    {
      id: 1,
      english_name: "Butterfly",
      sanskrit_name: "Baddha Koṇāsana",
      sanskrit_name_adapted: "Baddha Konasana",
      pose_description:
        "In sitting position, bend both knees and drop the knees to each side...",
      pose_benefits:
        "Opens the hips and groins. Stretches the shoulders, rib cage, and back...",
      url_svg: "https://example.com/butterfly.svg",
      url_png: "https://example.com/butterfly.png",
      url_svg_alt:
        "https://www.dropbox.com/s/3h2pts6xbn28dh7/butterfly%3F.svg?raw=1",
    },
    {
      id: 2,
      english_name: "Downward Dog",
      sanskrit_name: "Adho Mukha Svanasana",
      sanskrit_name_adapted: "Adho Mukha Svanasana",
      pose_description: "Begin on your hands and knees...",
      pose_benefits: "Strengthens the arms, legs, and back...",
      url_svg: "https://example.com/downwarddog.svg",
      url_png: "https://example.com/downwarddog.png",
      url_svg_alt:
        "https://www.dropbox.com/s/75xa1bduu2u5y7d/downdog.svg?raw=1",
    },
  ]);
};
