import React from 'react';
import '../App/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences.js';
import useToken from '../App/useToken';

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
