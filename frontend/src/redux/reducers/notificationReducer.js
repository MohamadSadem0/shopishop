// src/redux/reducers/notificationReducer.js

const initialState = {
    notifications: [],
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };
        default:
            return state;
    }
};

export default notificationReducer;
