import axios from "axios";
import {errorNotification} from "./notification";

export const BASE_URL = "http://localhost:8080/api/v1";

// export const BASE_URL = "https://api.leetcodelist.asliutkarsh.me/api/v1";


export const myAxios = axios.create({
    baseURL: BASE_URL,

});

export const myAxiosWithAuth = axios.create({
    baseURL: BASE_URL,
});

myAxiosWithAuth.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// call logOut using useAuth hook

export const logOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    errorNotification("You have been logged out")
}
myAxiosWithAuth.interceptors.response.use(response => response, error => {
    if (error.response.status === 403 ){
        // redirect to 403 page
        logOut()
    }
});
