const router = require("express").Router();
const UserController = require("../controllers/UserController");

/* MIDDLEWARE */
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");


/* USER */
router.post('/user/register', UserController.Create);
router.get('/user', auth, UserController.Read);
router.put('/user/update', auth, UserController.Update);
router.delete('/user/delete', auth, UserController.Delete);


router.post('/user/login', UserController.Login);
router.post('/user/logout', auth, UserController.Logout);

router.put('/user/follow', auth, UserController.addFollower)


/* ADMIN */
router.get('/users', auth, admin, UserController.ReadAll);




module.exports = router;