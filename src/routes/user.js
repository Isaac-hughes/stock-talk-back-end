const { Router } = require("express");
const { getMyProfile, addUser, updateUserById, deleteUser, login, logout } = require("../controllers/users");
const userRouter = Router();
const { hashPassword, auth } = require('../middleware/')

userRouter.get("/users/myprofile", auth, getMyProfile);
userRouter.post("/users", hashPassword ,addUser);
userRouter.patch("/users/myprofile", auth, hashPassword ,updateUserById);
userRouter.delete("/users/myprofile", auth, deleteUser);
userRouter.post("/users/login", login)
userRouter.get("/users/logout", auth, logout)

//tidier way
// userRouter.route("/users").get(getAllUsers).post(addUser);
// userRouter.route("/users/:id").patch(updateUserById).delete(deleteUser);

module.exports = {
  userRouter,
};