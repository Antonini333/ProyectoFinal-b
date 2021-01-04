const router = require("express").Router();
const PostController = require("../controllers/PostController");

/* MIDDLEWARE */
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/* POSTS */
router.post('/post', auth, PostController.Create);
router.get('/readposts', auth, PostController.Read);
router.put('/updatepost', auth, PostController.Update);
router.delete('/deletepost', auth, PostController.Delete);

/* ACTIONS */
router.put('/likepost/:_id', PostController.Like);
router.put('/unlikepost/:_id', auth, PostController.Unlike);

router.put('/commentpost/:_id', auth, PostController.Comment);


router.get('/readallposts', PostController.ReadAll);
router.get('/readcookingposts', PostController.Cooking)

module.exports = router;