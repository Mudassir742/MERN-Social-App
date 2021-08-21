const router = require("express").Router();
const Bcrypt = require("bcryptjs");
const { findById } = require("../models/userModel");
const User = require("../models/userModel");

//update user credentials
router.put("/:id", async (req, res) => {
  try {
    if (req.body.userID === req.params.id || req.user.isAdmin) {
      if (req.body.password) {
        const salt = await Bcrypt.genSalt(10);
        const hashPassword = await Bcrypt.hash(salt, req.body.password);

        res.json(hashPassword);
      }
      const isUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(isUser);
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});


//request to follow
router.post("/:id/follow", async (req, res) => {
  try {
    if (req.body.userID !== req.params.id) {
      const userToFollow = await User.findById(req.params.id);
      const userWhoFollow = await User.findById(req.body.userID);

      if (!userToFollow.followers.includes(req.body.userID)) {
        await userToFollow.updateOne({ $push: { followers: req.body.userID } });
        await userWhoFollow.updateOne({ $push: { following: req.params.id } });

        res.status(200).json({ message: "follow Success" });
      } else {
        res.status(400).json({ message: "you already follow" });
      }
    } else {
      res.status(400).json({ message: "you follow yourself" });
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
});

router.put("/:id/unfollow",async(req,res)=>{
    try {
        if (req.body.userID !== req.params.id) {
          const userToUnfollow = await User.findById(req.params.id);
          const userWhoUnfollow = await User.findById(req.body.userID);
    
          if (userToUnfollow.followers.includes(req.body.userID)) {
            await userToUnfollow.updateOne({ $pull: { followers: req.body.userID } });
            await userWhoUnfollow.updateOne({ $pull: { following: req.params.id } });
    
            res.status(200).json({ message: "unfollow Success" });
          } else {
            res.status(400).json({ message: "you do not follow" });
          }
        } else {
          res.status(400).json({ message: "you follow yourself" });
        }
      } catch (err) {
        res.status(404).json(err.message);
      }
})

module.exports = router;
