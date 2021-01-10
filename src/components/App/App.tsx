import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Preferences from '../Preferences/Preferences';
import useToken from './useToken';


function App() {
    const { token, setToken, deleteToken } = useToken();
    if(!token) {
        return <Login setToken={setToken} />
    }
    return (
        <BrowserRouter>
        <Container>
            <h1>Application</h1>
            <Row>
                <Col>
                    <Link to="/">Home</Link>
                </Col>
                <Col>
                    <Link to="/dashboard">Dashboard</Link>
                </Col>
                <Col>
                    <Link to="/preferences">Preferences</Link>
                </Col>
                <Col>
                    <Link to="/login">Login</Link>
                </Col>
                <Col>
                    <Link to="/logout">Logout</Link>
                </Col>
            </Row>
                    <Switch>
                        <Route path="/dashboard">
                            <Dashboard />
                        </Route>
                        <Route path="/preferences">
                            <Preferences />
                        </Route>
                        <Route path="/login">
                            <Login  setToken={setToken}/>
                        </Route>
                        <Route path="/logout">
                            <Logout />
                        </Route>
                    </Switch>


        </Container>
        </BrowserRouter>

    );
};

export default App;
