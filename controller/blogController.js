const Blogs = require("../models/blog");

const deleteBlog = (req, res) => {
  const id = req.params.id;

  Blogs.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const createBlogPage = (req, res) => {
  res.render("create", { title: "Create a new blog" });
};

const getBlog = (req, res) => {
  const id = req.params.id;
  Blogs.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "404" });
    });
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.render("index", { blogs, title: "All Blogs" });
  } catch (e) {
    console.log(e);
  }
};

const createBlog = async (req, res) => {
  Blogs.create(req.body)
    .then((blog) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  deleteBlog,
  createBlogPage,
  getBlog,
  getAllBlogs,
  createBlog,
};
