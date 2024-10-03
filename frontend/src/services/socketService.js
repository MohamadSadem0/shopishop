
// // src/services/socketService.js
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:9092', {
//   withCredentials: true,
//   extraHeaders: {
//     Authorization: `Bearer ${sessionStorage.getItem('authToken')}`, // Pass JWT
//   },
// });

// export const subscribeToNotifications = (cb) => {
//   socket.on('merchant_signup_notification', (message) => {
//     cb(message);
//   });
// };

// export const disconnectSocket = () => {
//   if (socket) socket.disconnect();
// };
// services/socketService.js
import { io } from 'socket.io-client';

let socket;

export const connectSocket = () => {
    socket = io('http://localhost:9092'); // Make sure this matches your Spring Boot Socket.IO server URL
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};

export const subscribeToNotifications = (callback) => {
    if (!socket) return;

    socket.on('newMerchantSignup', (message) => {
        callback(message);
    });
};
