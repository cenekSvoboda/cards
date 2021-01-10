import React from 'react';
import useToken from "../App/useToken";

export default function Logout() {
    const { token, setToken, deleteToken } = useToken();
    deleteToken();
    // @ts-ignore
    window.location = '/';
    return(<></>);
}