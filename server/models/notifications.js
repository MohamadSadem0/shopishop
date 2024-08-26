const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    superAdminId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;