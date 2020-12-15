const router = require("express").Router();
const LikeController = require("../controllers/LikeController");

/* MIDDLEWARE */
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


router.post('/like', LikeController.Create);


module.exports = router;