import React, { createContext, useReducer, useContext, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'AUTH':
            return { ...state, user: action.data };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user_info'));
        if (user) {
            dispatch({ type: 'AUTH', data: user });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user: state.user, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
