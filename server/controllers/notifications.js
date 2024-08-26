const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const config = require("config");
const { getConnectedUser } = require('../io');
const User = require("../models/user");
const { emitToSuperAdmins } = require("../io"); // Import the emit function
const Notification = require('../models/notifications');

// Function to mark all notifications as read
const markAllAsRead = async (req, res) => {
    try {
        const { notificationIds } = req.body;

        // Update all specified notifications to be marked as read
        await Notification.updateMany(
            { _id: { $in: notificationIds } },
            { $set: { read: true } }
        );

        res.status(200).json({ message: 'Notifications marked as read' });
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        res.status(500).json({ error: 'Failed to mark notifications as read' });
    }
}

module.exports = {
    markAllAsRead
};
