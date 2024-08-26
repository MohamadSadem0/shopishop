const express = require("express")

const { signinController, signupController,updateUserPhoneRole, getNotifications } = require("../controllers/userController")

const router = express.Router()

router.post("/signin", signinController)
router.post("/signup", signupController)
router.put("/phoneRole",updateUserPhoneRole)
router.get("/getNotifications",getNotifications)
module.exports = router;