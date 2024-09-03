const express = require("express");
const router = express.Router();

const { UserRegister, UserLogin } = require("../controllers/usercontrollers");

router.route("/signup").post(UserRegister);
router.post("/login", UserLogin);
module.exports = router;
