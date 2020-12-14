const router = require("express").Router();
const PostController = require("../controllers/PostController");

/* MIDDLEWARE */
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.post('/post', PostController.Create);
router.get('/readposts', PostController.Read);
router.put('/updatepost', PostController.Update);
router.delete('/deletepost', PostController.Delete);

router.get('/readallposts', PostController.ReadAll);

module.exports = router;