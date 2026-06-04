const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createTeamPost,
  fetchPosts,
  fetchPostById,
  removePost,
} = require("../controllers/postController");

const router = express.Router();

router.post("/", protect, createTeamPost);
router.get("/", protect, fetchPosts);
router.get("/:id", protect, fetchPostById);
router.delete("/:id", protect, removePost);

module.exports = router;