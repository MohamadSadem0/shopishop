import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useDispatch, useSelector } from 'react-redux'; // For Redux
import { addNotification } from '../redux/actions/notificationActions'; // Import the action

const Notifications = () => {
  const [localNotifications, setLocalNotifications] = useState([]);
  const dispatch = useDispatch(); // Dispatch for Redux actions
  const reduxNotifications = useSelector((state) => state.notifications.notifications); // Select notifications from Redux

  useEffect(() => {
    // Initialize SockJS and STOMP client
    const socket = new SockJS('http://localhost:5000/ws'); // Your Spring Boot WebSocket endpoint
    const stompClient = Stomp.over(socket);

    // Connect to WebSocket server
    stompClient.connect({}, (frame) => {
      console.log('Connected to WebSocket:', frame);  // Log WebSocket connection
  
      // Subscribe to the notifications topic
      stompClient.subscribe('/topic/superadmin-notifications', (message) => {
        console.log('Received notification:', message.body);  // Log received messages
        const notification = message.body;

        // Update local component state
        setLocalNotifications((prevNotifications) => [...prevNotifications, notification]);

        // Dispatch the notification to the Redux store
        dispatch(addNotification(notification));
      });
    });

    // Cleanup function to disconnect from the WebSocket when component unmounts
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [dispatch]);

  return (
    <div>
      <h2>SuperAdmin Notifications</h2>
      <ul>
        {/* Displaying notifications from the local state */}
        {localNotifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}

        {/* Alternatively, you can display notifications from Redux */}
        {reduxNotifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
