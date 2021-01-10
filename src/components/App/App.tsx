import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Preferences from '../Preferences/Preferences';
import useToken from './useToken';

function App() {
    const { token, setToken } = useToken();
    if(!token) {
        return <Login setToken={setToken} />
    }
    return (
        <Container>
            <h1>Application</h1>
            <Row>
                <Col>
                    test
                </Col>
                <Col>
                    test
                </Col>
                <Col>
                    test
                </Col>
                <Col>
                    test
                </Col>
                <BrowserRouter>
                    <Switch>
                        <Route path="/dashboard">
                            <Col>
                                <Dashboard />
                            </Col>
                        </Route>
                        <Route path="/preferences">
                            <Col>
                                <Preferences />
                            </Col>
                        </Route>
                        <Route path="/login">
                            <Col>
                                <Login  setToken={setToken}/>
                            </Col>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </Row>
        </Container>

    );
};

export default App;
