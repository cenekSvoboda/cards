import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        // @ts-ignore
        const tokenString = sessionStorage.getItem('token');
        // @ts-ignore
        const userToken = JSON.parse(tokenString);
        return userToken?.token
    };
    const [token, setToken] = useState(getToken());
    const saveToken = (userToken: { token: string; }) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };
    const delToken = () => {
        sessionStorage.removeItem('token');
    };
    return {
        setToken: saveToken,
        token,
        deleteToken: delToken
    }
}