const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    userID:{
        type:String,
        require:true
    },
    discription: {
        type: String,
        max: 500,
      },
      img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true }
);

module.exports = mongoose.model("posts",postSchema)