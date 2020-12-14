const router = require("express").Router();
const PostController = require("../controllers/PostController");

/* MIDDLEWARE */
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.post('/post', PostController.Create);
router.get('/readPost', PostController.Read);


module.exports = router;