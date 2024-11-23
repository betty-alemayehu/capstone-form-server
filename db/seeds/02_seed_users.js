//01_seed_users.js
export const seed = async (knex) => {
  // Clear existing data
  await knex("users").del();

  // Insert seed data
  await knex("users").insert([
    {
      id: 1,
      name: "Betty Alemayehu",
      email: "betty@example.com",
      password: "securepasswordhash1",
      profile_picture: "https://example.com/uploads/profile1.jpg",
    },
    {
      id: 2,
      name: "Joe Doe",
      email: "another@example.com",
      password: "securepasswordhash2",
      profile_picture: "https://example.com/uploads/profile2.jpg",
    },
  ]);
};
