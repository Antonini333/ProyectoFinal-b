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
router.put('/likepost/:id', auth, PostController.Like);
router.put('/unlikepost', auth, PostController.Unlike);
router.put('/commentpost', auth, PostController.Comment);

router.get('/readallposts', PostController.ReadAll);

module.exports = router;