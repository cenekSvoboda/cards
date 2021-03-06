import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Link, useParams} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import CardList from '../CardList/CardList';
import Logout from '../Logout/Logout';
import Preferences from '../Preferences/Preferences';
import useToken from './useToken';
import conf from "../../conf";


async function getCard(abbrev: string | undefined): Promise<any> {
    return fetch('http://'+conf.appUrl+':8080/card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"abbrev":abbrev})
    })
    .then(data => {
        return data.json();
    })
}


function App() {
    const { token, setToken } = useToken();
    //return <Login setToken={setToken} />

    var condDashboard = <></>;
    var condPrefs = <></>;
    var condLogin = <></>;
    if (token) {
        condDashboard = <Dashboard />;
        condPrefs = <Preferences />;
        condLogin = <Col>
            <Link to="/logout">Logout</Link>
        </Col>;
    } else {
        condLogin = <Col>
            <Link to="/login">Login</Link>
        </Col>;
    }
    return (
        <BrowserRouter>
        <Container>
            {/*<h1>Application</h1>*/}
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
                    <Link to="/list">List</Link>
                </Col>
                {condLogin}
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
                        <Route path="/list">
                            <CardList />
                        </Route>
                        <Route path="/:abbrev">
                            <BCard />
                        </Route>
                    </Switch>
        </Container>
        </BrowserRouter>

    );
};

function BCard() {
    const [cardInfo, setCardInfo] = useState(0) as any;
    let { abbrev } = useParams() as any;
    useEffect(() => {
        getCard(
            abbrev
        ).then(function(a){
            setCardInfo(JSON.stringify(a));
        });
    });

    return (
        <div >
            <h3>ID: {cardInfo}</h3>
        </div>
    );
}

export default App;
