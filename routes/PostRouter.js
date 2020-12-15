const router = require("express").Router();
const PostController = require("../controllers/PostController");

/* MIDDLEWARE */
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.post('/post', auth, PostController.Create);
router.get('/readposts', auth, PostController.Read);
router.put('/updatepost', auth, PostController.Update);
router.delete('/deletepost', auth, PostController.Delete);

router.get('/readallposts', PostController.ReadAll);

module.exports = router;