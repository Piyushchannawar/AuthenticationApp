const express = require("express");
const router = express.Router();
const {signUp,login} = require("../controllers/auth-controller.js");
const verifyToken = require("../middlewares/verifyToken.js");
const { getUser } = require("../controllers/user-controller.js");

router.post("/signup",signUp)
router.post("/login",login)
router.get("/user",verifyToken,getUser)


module.exports = router;