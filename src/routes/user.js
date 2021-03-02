const { Router } = require("express");
const { getMyProfile, addUser, updateUserById, deleteUser, login, logout, addToWatchlist, removeFromWatchlist, followUser, unfollowUser, getUserByUsername } = require("../controllers/user");
const userRouter = Router();
const { hashPassword, auth } = require('../middleware/')

userRouter.get("/users/myprofile", auth, getMyProfile);
userRouter.get("/users/:username", auth, getUserByUsername);
userRouter.post("/users", hashPassword ,addUser);
userRouter.patch("/users/myprofile", auth, hashPassword ,updateUserById);
userRouter.patch("/users/addtowatchlist", auth, addToWatchlist);
userRouter.patch("/users/removefromwatchlist", auth, removeFromWatchlist);
userRouter.delete("/users/myprofile", auth, deleteUser);
userRouter.post("/users/login", login)
userRouter.get("/users/logout", auth, logout)
userRouter.patch("/users/follow", auth, followUser)
userRouter.patch("/users/unfollow", auth, unfollowUser)


module.exports = {
  userRouter,
};