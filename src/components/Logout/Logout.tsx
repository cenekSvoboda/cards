import React from 'react';
import useToken from "../App/useToken";

export default function Logout() {
    const deleteToken = useToken()["deleteToken"];
    deleteToken();
    // @ts-ignore
    window.location = '/';
    return(<></>);
}