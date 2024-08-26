const express = require("express")

const { markAllAsRead } = require("../controllers/notifications")

const router = express.Router()

router.put("/markNotificationsAsRead",markAllAsRead)

module.exports = router;