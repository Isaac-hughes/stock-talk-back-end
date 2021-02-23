// const mongoose = require("mongoose");

// const commentSchema = new mongoose.Schema(
//   {
//     content: {
//       type: String,
//       required: true,
//     },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },
//     username: {
//         type: String,
//         required: true
//     },
//     likes: [
//         {username: String}
//     ],
//     type: "comment"
//   },
//   { timestamps: true }
// );

// const Comment = mongoose.model("Comment", commentSchema);

// module.exports = { Comment };