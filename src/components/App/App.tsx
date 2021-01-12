import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Link, useParams} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Preferences from '../Preferences/Preferences';
import useToken from './useToken';


function App() {
    const { token, setToken } = useToken();
    //return <Login setToken={setToken} />

    var condDashboard = <></>;
    var condPrefs = <></>;
    var condLogin = <></>;
    if (token) {
        condDashboard = <Dashboard />;
        condPrefs = <Preferences />;
    } else {
        condLogin = <Col>
            <Link to="/login">Login</Link>
        </Col>;
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
                {condLogin}
                <Col>
                    <Link to="/logout">Logout</Link>
                </Col>
            </Row>
                    <Switch>
                        <Route path="/dashboard">
                            {condDashboard}
                        </Route>
                        <Route path="/preferences">
                            {condPrefs}
                        </Route>
                        <Route path="/login">
                            <Login  setToken={setToken}/>
                        </Route>
                        <Route path="/logout">
                            <Logout />
                        </Route>
                        <Route path="/:id" children={<Child />} />
                    </Switch>
        </Container>
        </BrowserRouter>

    );
};

function Child() {
    let { id } = (useParams() as any);
    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    );
}

export default App;
