const mongoose = require('mongoose');
const { post } = require('.');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/pintrest");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true, 
    unique: true,
  },

  password:String,

  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }],

  profileImage: String,
  contact: String,
})

userSchema.plugin(plm);
module.exports = mongoose.model('user', userSchema);