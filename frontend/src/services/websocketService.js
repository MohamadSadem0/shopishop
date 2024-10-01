// src/services/websocketService.js

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient = null;

const connect = (onMessageReceived) => {
    const socket = new SockJS('http://localhost:5000/ws'); // Your Spring Boot WebSocket endpoint
    stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);

        // Subscribe to the SuperAdmin notifications topic
        stompClient.subscribe('/topic/superadmin-notifications', (message) => {
            onMessageReceived(message.body);
        });
    });
};

const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
        console.log("Disconnected");
    }
};

export default {
    connect,
    disconnect
};
