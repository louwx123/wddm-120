const express = require("express"); 
const router = express.Router();
const isAuth = require("../middleware/auth")
const isAdmin = require("../middleware/authorization")

router.get('/',isAuth,isAdmin)

module.exports = router;

