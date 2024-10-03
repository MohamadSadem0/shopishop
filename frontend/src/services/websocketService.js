import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import store from '../redux/store';
import { addNotification } from '../redux/actions/notificationActions';

let stompClient = null;

const connectWebSocket = () => {
    const socket = new SockJS('http://localhost:5000/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
        console.log('Connected to WebSocket:', frame);

        // Subscribe to the superadmin notifications topic
        stompClient.subscribe('/topic/superadmin-notifications', (message) => {
            const notificationMessage = message.body;
            console.log('Received WebSocket notification:', notificationMessage);

            // Dispatch notification to Redux store
            store.dispatch(addNotification(notificationMessage));
        });
    }, (error) => {
        console.error('WebSocket connection error:', error); // Log detailed error
        if (error.headers) {
            console.error('Error headers:', error.headers);
        }
        if (error.body) {
            console.error('Error body:', error.body);
        }
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
