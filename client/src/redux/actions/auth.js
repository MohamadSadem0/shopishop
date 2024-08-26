import { AUTH } from "../const/actionsTypes";
import * as api from "../../api/index";

export const loadUser = () => async (dispatch) => {
    const localUser = JSON.parse(localStorage.getItem("user_info"));

    if (localUser) {
        dispatch({ type: AUTH, data: localUser });
    }
};

const handleNavigation = (data, navigate) => {
    console.log("Handling navigation:", data);

    if (data.result.email === 'mrsbeii@gmail.com' || data.result.role === "superAdmin") {
        console.log("Navigating to /superAdmin/home");
        navigate('/superAdmin/home');
    } else if (!data.result.role || data.result.role === 'noRole') {
        console.log("Role is noRole or undefined, navigating to /phoneRole");
        navigate('/phoneRole');
    } else {
        switch (data.result.role) {
            case 'magazineOwner':
                console.log("Navigating to /merchant/home");
                navigate('/merchant/home');
                break;
            case 'user':
                console.log("Navigating to /user/home");
                navigate('/user/home');
                break;
            case 'biker':
                console.log("Navigating to /biker/home");
                navigate('/biker/home');
                break;
            case 'driver':
                console.log("Navigating to /driver/home");
                navigate('/driver/home');
                break;
            default:
                console.log("Unknown role, navigating to /signin");
                navigate('/signin');
        }
    }
};

export const signin = (data2, navigate) => async (dispatch) => {
    try {
        console.log("Signing in with data:", data2);
        const { data } = await api.signIn(data2);
        console.log("Sign in response:", data);
        dispatch({ type: AUTH, data });
        handleNavigation(data, navigate);
    } catch (err) {
        console.log("Sign in error:", err);
    }
};

export const signinGoogle = (accessToken, navigate) => async (dispatch) => {
    try {
        console.log("Signing in with Google, token:", accessToken);
        const { data } = await api.signInGoogle(accessToken);
        console.log("Sign in Google response:", data);
        dispatch({ type: AUTH, data });
        handleNavigation(data, navigate);
    } catch (err) {
        console.log("Sign in Google error:", err);
    }
};

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        console.log("Signing up with data:", formData);
        const { data } = await api.signUp(formData);
        console.log("Sign up response:", data);
        dispatch({ type: AUTH, data });
        handleNavigation(data, navigate);
    } catch (err) {
        console.log("Sign up error:", err);
    }
};

export const signupGoogle = (accessToken, navigate) => async (dispatch) => {
    try {
        console.log("Signing up with Google, token:", accessToken);
        const { data } = await api.signUpGoogle(accessToken);
        console.log("Sign up Google response:", data);
        dispatch({ type: AUTH, data });
        handleNavigation(data, navigate);
    } catch (err) {
        console.log("Sign up Google error:", err);
    }
};
