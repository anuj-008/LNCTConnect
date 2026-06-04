const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  getPostOwner,
} = require("../models/postModel");

const removePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await getPostOwner(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.user_id !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    await deletePost(postId);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const createTeamPost = async (req, res) => {
  try {
    const {
      title,
      description,
      requiredSkills,
    } = req.body;

    const post = await createPost(
      title,
      description,
      requiredSkills,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const fetchPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const fetchPostById = async (req, res) => {
  try {
    const post = await getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post,
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
  createTeamPost,
  fetchPosts,
  fetchPostById,
  removePost,
};