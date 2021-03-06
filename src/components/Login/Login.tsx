import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import conf from '../../conf';

async function loginUser(credentials: { abbrev: string | undefined; password: string | undefined; }): Promise<any> {
    return fetch('http://'+conf.appUrl+':8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => {
            return data.json();
        })
}


// @ts-ignore
export default function Login(this: any, { setToken }) {
    const [abbrev, setAbbrev] = React.useState<string | undefined>();
    const [password, setPassword] = React.useState<string | undefined>();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const token = await loginUser({
            abbrev,
            password
        });
        setToken(token);
        // @ts-ignore
        window.location = '/';
    };


    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setAbbrev(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}