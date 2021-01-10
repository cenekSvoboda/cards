import React, { useState } from 'react';
import '../App/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences.js';
import useToken from '../App/useToken';

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
}

function App() {
    const { token, setToken } = useToken();
    if(!token) {
        return <Login setToken={setToken} />
    }
    return (
        <div className="wrapper">
            <h1>Applicationz</h1>
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/preferences">
                        <Preferences />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
