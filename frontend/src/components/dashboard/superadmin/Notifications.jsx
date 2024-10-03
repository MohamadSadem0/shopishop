import React, { useState, useEffect } from 'react';

const Notifications = ({ message }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            // Hide the notification after 5 seconds
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!visible) {
        return null; // Don't render anything if the notification is not visible
    }

    return (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg opacity-90 z-50 transition-transform duration-300 ease-out transform translate-y-0">
            <p className="m-0">{message}</p>
        </div>
    );
};

export default Notifications;
