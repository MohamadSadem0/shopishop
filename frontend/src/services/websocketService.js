

// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';
// import store from '../redux/store';
// import { addNotification } from '../redux/actions/notificationActions';
// import CryptoJS from 'crypto-js'; // Ensure you have CryptoJS for decryption

// let stompClient = null;
// const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

// const connectWebSocket = () => {
//     // Decrypt the JWT token
//     const encryptedToken = sessionStorage.getItem('authToken'); // Change this to localStorage if needed
//     const token = CryptoJS.AES.decrypt(encryptedToken, encryptionKey).toString(CryptoJS.enc.Utf8);

//     // Ensure the token is not null or undefined
//     if (!token) {
//         console.error("No valid JWT token found. Cannot connect to WebSocket.");
//         return;
//     }

//     const socket = new SockJS('https://dry-temple-95599.herokuapp.com/ws');
//     stompClient = Stomp.over(socket);
 
//     // Connect with JWT token in headers
//     stompClient.connect({
//         Authorization: `Bearer ${token}` // Include the JWT token as a Bearer token in headers
        
//     }, (frame) => {
//         console.log('Connected to WebSocket:', frame);

//         // Subscribe to the admin notifications topic
//         stompClient.subscribe('/topic/superadmin-notifications', (message) => {
//             console.log('Received WebSocket notification:', message.body);
//             // Dispatch notification to Redux or handle it
//             store.dispatch(addNotification(message.body));
//         });
//     }, (error) => {
//         console.error('WebSocket connection error:', error); // Log detailed error
//         if (error.headers) {
//             console.error('Error headers:', error.headers);
//         }
//         if (error.body) {
//             console.error('Error body:', error.body);
//         }
//     });
// };

// const disconnectWebSocket = () => {
//     if (stompClient !== null) {
//         stompClient.disconnect();
//         console.log('Disconnected from WebSocket');
//     }
// };

// export default {
//     connectWebSocket,
//     disconnectWebSocket
// };

import { io } from "socket.io-client";
import store from '../redux/store';
import { addNotification } from '../redux/actions/notificationActions';

let socket = null;

const connectSocket = () => {
    const token = sessionStorage.getItem('authToken'); // Assuming JWT is stored in sessionStorage

    if (!token) {
        console.error("No valid JWT token found. Cannot connect to WebSocket.");
        return;
    }

    socket = io("http://localhost:5000", {
        query: { token },  // Pass the token in the query parameters
        transports: ['websocket'],  // Force WebSocket transport
    });

    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
    });

    socket.on('superadmin-notifications', (message) => {
        console.log('New notification:', message);
        store.dispatch(addNotification(message));  // Dispatch the notification
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
    });

    socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
    });
};

const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log('Disconnected from WebSocket');
    }
};

export default {
    connectSocket,
    disconnectSocket
};
