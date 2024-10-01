// src/redux/actions/notificationActions.js

import WebSocketService from '../../services/websocketService';

export const connectWebSocket = () => (dispatch) => {
    WebSocketService.connect((message) => {
        dispatch({
            type: 'NEW_NOTIFICATION',
            payload: message,
        });
    });
};

export const disconnectWebSocket = () => (dispatch) => {
    WebSocketService.disconnect();
    dispatch({ type: 'DISCONNECT_WEB_SOCKET' });
};
