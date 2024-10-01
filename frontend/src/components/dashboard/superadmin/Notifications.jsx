import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize SockJS and STOMP client
    const socket = new SockJS('http://localhost:8080/ws'); // Your Spring Boot WebSocket endpoint
    const stompClient = Stomp.over(socket);

    // Connect to WebSocket server
    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);

      // Subscribe to the topic for SuperAdmin notifications
      stompClient.subscribe('/topic/superadmin-notifications', (message) => {
        showNotification(message.body);
      });
    });

    // Cleanup function to disconnect from the WebSocket when component unmounts
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  // Function to display notification in the UI
  const showNotification = (message) => {
    setNotifications((prevNotifications) => [...prevNotifications, message]);
  };

  return (
    <div>
      <h2>SuperAdmin Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
