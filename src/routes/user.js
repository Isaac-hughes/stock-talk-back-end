const { Router } = require("express");
const { getMyProfile, addUser, updateUserById, deleteUser, login, logout, addToWatchlist, removeFromWatchlist } = require("../controllers/user");
const userRouter = Router();
const { hashPassword, auth } = require('../middleware/')

userRouter.get("/users/myprofile", auth, getMyProfile);
userRouter.post("/users", hashPassword ,addUser);
userRouter.patch("/users/myprofile", auth, hashPassword ,updateUserById);
userRouter.patch("/users/addtowatchlist", auth, addToWatchlist);
userRouter.patch("/users/removefromwatchlist", auth, removeFromWatchlist);
userRouter.delete("/users/myprofile", auth, deleteUser);
userRouter.post("/users/login", login)
userRouter.get("/users/logout", auth, logout)


module.exports = {
  userRouter,
};