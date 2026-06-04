const pool = require("../config/db");

const createPost = async (
  title,
  description,
  requiredSkills,
  userId
) => {
  const result = await pool.query(
    `
    INSERT INTO posts
    (
      title,
      description,
      required_skills,
      user_id
    )
    VALUES ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      title,
      description,
      requiredSkills,
      userId,
    ]
  );

  return result.rows[0];
};

const getAllPosts = async () => {
  const result = await pool.query(`
    SELECT
      p.id,
      p.title,
      p.description,
      p.required_skills,
      p.created_at,
      u.name AS author_name,
      u.branch
    FROM posts p
    JOIN users u
      ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `);

  return result.rows;
};

const getPostById = async (id) => {
  const result = await pool.query(
    `
    SELECT
      p.*,
      u.name AS author_name,
      u.email
    FROM posts p
    JOIN users u
      ON p.user_id = u.id
    WHERE p.id = $1
    `,
    [id]
  );

  return result.rows[0];
};

const deletePost = async (postId) => {
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *",
    [postId]
  );

  return result.rows[0];
};

const getPostOwner = async (postId) => {
  const result = await pool.query(
    "SELECT user_id FROM posts WHERE id = $1",
    [postId]
  );

  return result.rows[0];
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  getPostOwner,
};