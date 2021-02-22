const { Post } = require("../models/Posts");

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(200).send(allPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const allPosts = await Post.find({ author: req.user._id });
    res.status(200).send(allPosts);
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
};

exports.addPost = async (req, res) => {
  try {
      console.log("add post called")
    const post = new Post(req.body);
    post.author = req.user._id;
    post.username = req.user.username
    const returnedValue = await post.save();

    res.status(201).send(returnedValue);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(post);
    res.status(200).send("successfully updated");
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
};

exports.tester = (req, res) => {
  res.status(200).send({message: "test passed"})
}