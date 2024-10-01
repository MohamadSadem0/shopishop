import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import store from '../redux/store';
import { addNotification } from '../redux/actions/notificationActions';

let stompClient = null;

const connectWebSocket = () => {
    const socket = new SockJS('http://localhost:5000/ws');  // Ensure this is the correct backend WebSocket URL
    stompClient = Stomp.over(() => socket);  // Use factory function for SockJS

    stompClient.connect({}, (frame) => {
        console.log('Connected to WebSocket:', frame);  // Log connection success

        // Subscribe to a topic
        stompClient.subscribe('/topic/superadmin-notifications', (message) => {
            console.log('Received WebSocket message:', message.body);  // Log received message
            const notification = message.body;

            // Dispatch the notification to Redux or handle it
            store.dispatch(addNotification(notification));
        });
    }, (error) => {
        console.error('WebSocket connection error:', error);  // Log any connection errors
    });
};

const disconnectWebSocket = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
        console.log('Disconnected from WebSocket');
    }
};

export default {
    connectWebSocket,
    disconnectWebSocket
};
