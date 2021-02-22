const { Router } = require("express");
const postRouter = Router();
const { getAllPosts, getPostsByUser, addPost, updatePost, deletePost, tester } = require("../controllers/posts");
const { auth, test } = require('../middleware/')

postRouter.get("/posts", getAllPosts);
postRouter.get("/posts/:user_id", auth, getPostsByUser);
postRouter.get("/posts/:user_id", auth, getPostsByUser);
postRouter.post("/posts", auth, addPost);
postRouter.patch("/posts/:id", auth, updatePost);
postRouter.delete("/posts/:id", auth, deletePost);
postRouter.get("/posts/test", test, tester)

module.exports = {
  postRouter,
};
