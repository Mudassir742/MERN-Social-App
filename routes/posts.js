const router = require("express").Router();
const Post = require("../models/postModel");

//create post
router.post("/createpost", async (req, res) => {
  try {
    const ispostSaved = new Post(req.body);

    const response = await ispostSaved.save();

    res.status(200).json(response);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
    const postToDelete = Post.findById(req.params.id);

    if (postToDelete.userID === req.body.userID) {
      await postToDelete.deleteOne();
      res.status(200).json({ message: "post deleted" });
    } else {
      res.status(404).json({ message: "unable to delete" });
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
});



module.exports = router;
