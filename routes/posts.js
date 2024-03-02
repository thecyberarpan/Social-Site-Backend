const mongoose = require('mongoose');
const { stringify } = require('uuid');


const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: String,
    description: String,
    image: String,
});

module.exports = mongoose.model("post" , postSchema);