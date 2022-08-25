import axios from "axios";
import store from "../../store/store";
import { authActions } from "../../store/auth-slice";

const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export const client = ({ ...options }) => {

    const onSuccess = (res) => {
        return res;
    };
    
    const onError = (err) => {
        console.log('Err', err.response);
        if (err.response.status) {
            if (err.response.status === 401 || err.response.status === 403 || err.response.status === 404) {
                if (localStorage.getItem('flagToken')) {
                    localStorage.removeItem('flagToken');
                    store.dispatch(authActions.logout());
                };
            }
        };
        return Promise.reject(err);
    };


    API.defaults.headers.common['Accept'] = 'application/json';
    return API(options)
        .then(onSuccess)
        .catch(onError);
};