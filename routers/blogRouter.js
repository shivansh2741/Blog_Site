const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router.route("/create").get(blogController.createBlogPage);
router
  .route("/:id")
  .get(blogController.getBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
