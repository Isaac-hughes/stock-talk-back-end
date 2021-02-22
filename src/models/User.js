const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    },
    "username": {
        type: String,
        required: true,
        unique: true
    },
    "watchlist": [
        {ticker: {type: String}}
    ],
    "tokens": [
        {token: {type: String}}
    ]
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Unable to login")
    }
    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch){
        throw new Error("Unable to login")
    }
    return user 
}

userSchema.methods.toJSON = async function() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;

}

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id}, process.env.SECRET, {expiresIn: "1 week"})
    this.tokens.push({token})
    await this.save()
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}