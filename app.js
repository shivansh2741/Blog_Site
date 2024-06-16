const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const blogController = require("./controller/blogController");
const router = require("./routers/blogRouter");

//connecting to DB
const uri =
  "mongodb+srv://shivanshd10:Nq1lz9F7pF6q9T5j@cluster0.ma53l0d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();

// express app
const app = express();

app.use(express.json());

// listen for requests
app.listen(3000);

// register view engine
app.set("view engine", "ejs");

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.use("/blogs", router);

app.get("/about", (req, res) => {
  res.render("about", { title: "About Section" });
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
