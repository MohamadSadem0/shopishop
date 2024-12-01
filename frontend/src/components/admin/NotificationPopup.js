import React from 'react';

/**
 * NotificationPopup component to display multiple notifications.
 * @param {Array} notifications - List of notifications to be displayed.
 */
const NotificationPopup = ({ notifications }) => {
    return (
        <div className="fixed top-5 right-5 space-y-2 z-50">
            {notifications.map((notification, index) => (
                <div
                    key={index}
                    className="bg-blue-500 text-white p-4 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out animate-fade"
                >
                    <p>{notification}</p>
                </div>
            ))}
        </div>
    );
};

export default NotificationPopup;
