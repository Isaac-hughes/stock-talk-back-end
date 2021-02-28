const { Post } = require("../models/Posts");
const {User} = require("../models/User")

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
    const allPosts = await Post.find({author: req.body._id});
    res.status(200).send(allPosts);
  } catch (error) {
    res.status(404).send({ message: "post not found" });
  }
};

exports.getPostByID = async (req, res) => {
  try {
    const post = await Post.find({_id: req.body._id});
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ message: "post not found" });
  }
};

exports.addPost = async (req, res) => {
  try {
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
    const post = await Post.findByIdAndUpdate(req.body._id, {content: req.body.content}, { new: true });
    res.status(200).send("successfully updated");
  } catch (error) {
    res.status(404).send({ message: "Post not found" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.body._id);
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send({ message: "post not found" });
  }
};

exports.likePost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.body._id);
    let arr = post.likes
    arr.push({username: user.username})
    post.likes = arr
    await post.save()
    res.status(200).send("Liked")
  } catch (error) {
    res.status(404).send({ message: "post not found" });
  }
}

exports.unlikePost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.body._id);
    let data = post.likes
    let newArr = []
    for (i in data){
      if (data[i].username != user.username){
          newArr.push(data[i])
      }
    }
    post.likes = newArr
    await post.save();
    res.status(200).send("unliked")
  } catch (error) {
    res.status(404).send({ message: "post not found" });
  }
}

exports.getPostsByFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const following = user.following
    let postArray = []
    for(i in following){
      let posts = await Post.find({username: following[i].username});
      for(i in posts){
        postArray.push(posts[i])
      }
    }
    postArray.sort(function(a, b) {
      var timeA = a.createdAt; 
      var timeB = b.createdAt;
      if (timeA < timeB) {
        return 1;
      }
      if (timeA > timeB) {
        return -1;
      }
      return 0;
    });
    res.status(200).send(postArray)
  } catch (error) {
    console.log(error)
  }
  

}


exports.tester = (req, res) => {
  res.status(200).send({message: "test passed"})
}