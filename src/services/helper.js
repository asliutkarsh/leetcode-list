import axios from "axios";

export const BASE_URL = "http://localhost:8080/api/v1";

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