const router = require ("express").Router();
const UserController = require("../controllers/UserController");
const auth = require("../middleware/auth"); 


router.post('/user/register', UserController.Register);
router.post('/user/login', UserController.Login);
router.post('/user/logout', auth, UserController.Logout);

module.exports = router;