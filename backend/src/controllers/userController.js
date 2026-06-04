const pool = require("../config/db");

const getCurrentUser = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        name,
        email,
        branch,
        year,
        skills,
        bio,
        github,
        linkedin
      FROM users
      WHERE id = $1
      `,
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      branch,
      year,
      skills,
      bio,
      github,
      linkedin,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE users
      SET
        branch = $1,
        year = $2,
        skills = $3,
        bio = $4,
        github = $5,
        linkedin = $6
      WHERE id = $7
      RETURNING
        id,
        name,
        email,
        branch,
        year,
        skills,
        bio,
        github,
        linkedin
      `,
      [
        branch,
        year,
        skills,
        bio,
        github,
        linkedin,
        req.user.userId,
      ]
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { skill, branch } = req.query;

    let query = `
      SELECT
        id,
        name,
        email,
        branch,
        year,
        skills,
        bio,
        github,
        linkedin
      FROM users
      WHERE 1=1
    `;

    const values = [];
    let index = 1;

    if (skill) {
      query += ` AND LOWER(skills) LIKE LOWER($${index})`;
      values.push(`%${skill}%`);
      index++;
    }

    if (branch) {
      query += ` AND LOWER(branch) = LOWER($${index})`;
      values.push(branch);
      index++;
    }

    query += ` ORDER BY id`;

    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      count: result.rows.length,
      users: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};  
module.exports = {
  getCurrentUser,
  updateProfile,
  getAllUsers,
};