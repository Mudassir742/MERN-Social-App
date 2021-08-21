const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        require:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        require:true,
        min:8
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPhoto:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
      discription: {
        type: String,
        max: 50,
      },
      city: {
        type: String,
        max: 50,
      },
      from: {
        type: String,
        max: 50,
      },
      relationship: {
        type: Number,
        enum: [1, 2, 3],
      },
},{timestamps:true})

module.exports = mongoose.model('Users',userSchema)