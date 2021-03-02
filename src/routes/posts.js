const { Router } = require("express");
const postRouter = Router();
const { getAllPosts, getPostsByUser, getPostsByFollowing, getPostByID, addPost, updatePost, deletePost, tester, likePost, unlikePost } = require("../controllers/posts");
const { auth, test } = require('../middleware/')

postRouter.get("/posts", auth, getAllPosts);
postRouter.get("/posts/getbyuser/:username", auth, getPostsByUser);
postRouter.get("/posts/getbyfollowing", auth, getPostsByFollowing);
postRouter.get("/posts/getbyid/:id", auth, getPostByID);
postRouter.post("/posts", auth, addPost);
postRouter.patch("/posts/updatepost", auth, updatePost);
postRouter.delete("/posts/delete", auth, deletePost);
postRouter.patch("/posts/like", auth, likePost)
postRouter.patch("/posts/unlike", auth, unlikePost)
postRouter.get("/posts/test", test, tester)

module.exports = {
  postRouter,
};
