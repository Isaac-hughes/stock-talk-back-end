const { User } = require("../models/User");


exports.getMyProfile = async (req, res) => {
    let data = await req.user
    console.log(data)

  res.status(200).send(data)
}


exports.addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken()
    const savedUser = await user.save();
    console.log(req.body);
    res.status(201).send({savedUser, token});
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: "User already exists" })
    } else {
      
    }
    res.status(500).send({ message: "Could not connect" });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "User not found" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await req.user.remove()
    res.status(200).send("User deleted");
  } catch (error) {
    res.status(404).send({ message: "User not found" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken()
    res.status(200).send({user, token})
  } catch (error) {
    res.status(400).send({message: "Unable to login"})
  }
}

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenObj) => {
      return tokenObj.token !== req.token
    })
    await req.user.save()
    res.status(200).send({ message: "Successfully logged out"})
  } catch (error) {
    res.state(500).send({message: "Unable to log out"})
  }
}

exports.addToWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.watchlist.push(req.body)
        await user.save()
        res.status(200).send(user.watchlist)
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "error adding to watchlist"})
    }
}

exports.removeFromWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        let data = user.watchlist
        let newArr = []
        for (i in data){
            if (data[i].ticker != req.body.ticker){
                newArr.push(data[i])
            }
        }
        user.watchlist = newArr
        await user.save();
        res.status(200).send(user.watchlist);
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "error adding to watchlist"})
    }
}

exports.followUser = async (req, res) => {
  try {
      const user = await User.findById(req.user._id);
      user.following.push(req.body)
      const followed = await User.findById(req.body._id)
      followed.followers.push({_id: user._id, username: user.username})
      await user.save()
      await followed.save()
      res.status(200).send("successfully followed user")
  } catch (error) {
      console.log(error)
      res.status(500).send({message: "error trying to follow"})
  }
}

exports.unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let data = user.following
    let newArr = []
    for (i in data){
        if (data[i].username != req.body.username){
            newArr.push(data[i])
        }
    }
    user.following = newArr
    const followed = await User.findById(req.body._id)
    let data2 = followed.followers
    let newArr2 = []
    for (i in data2){
        if (data2[i].username != user.username){
            newArr2.push(data[i])
        }
    }
    followed.followers = newArr2
    await user.save()
    await followed.save()
    res.status(200).send("successfully unfollowed user")
  } catch (error) {
    console.log(error)
    res.status(500).send({message: "error trying to unfollow"})
  }
}