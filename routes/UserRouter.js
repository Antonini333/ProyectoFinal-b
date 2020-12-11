const router = require ("express").Router();
const UserController = require("../controllers/UserController");

router.post('/user/register', UserController.Register);
router.post('/user/login', UserController.Login);
router.post('/user/logout', UserController.Logout);

module.exports = router;