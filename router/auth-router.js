const express = require("express");
const router = express.Router();
const authcontrollers = require("../controller/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const {signupSchema, loginSchema} = require("../validators/auth-validate");
const validate = require("../middlewares/validate-middleware");

router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signupSchema),authcontrollers.register);
router.route("/login").post(validate(loginSchema),authcontrollers.login);
router.route("/user").get(authMiddleware,authcontrollers.user);
module.exports = router;