const router = require ("express").Router();
const UserController = require("../controllers/UserController");

              /* MIDDLEWARE */
const auth = require("../middleware/auth"); 
const admin = require("../middleware/admin"); 


              /* USER */
router.post('/user/register', UserController.Register);
router.post('/user/login', UserController.Login);
router.post('/user/logout', auth, UserController.Logout);
router.delete('/user/delete', auth, UserController.Delete);


               /* ADMIN */
router.get('/users', auth, admin, UserController.GetAll);




module.exports = router;