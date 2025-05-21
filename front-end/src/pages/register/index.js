import React, { useState } from "react";
import '../login/login.css';
import '../../index.css';
import { Form, Link, useNavigate } from "react-router";
import { registerUser } from "../../api";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await registerUser(username, email, password);
            navigate('/login');
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="Register page">
            <div className="login-container">
                <h1>Register a new account</h1>
                <Form onSubmit={handleRegisterSubmit}>
                    <label className="login-label" htmlFor="form-username">Username</label><br />
                    <input className="login-input" id="form-username" value={username} onChange={e => setUsername(e.target.value)} type="text" required /><br />

                    <label className="login-label" htmlFor="form-email">Email</label><br />
                    <input className="login-input" id="form-email" value={email} onChange={e => setEmail(e.target.value)} type="email" required /><br />

                    <label className="login-label" htmlFor="form-password">Password</label><br />
                    <input className="login-input" id="form-password" value={password} onChange={e => setPassword(e.target.value)} type="password" required /><br />

                    <input className="login-btn" type="submit" value="Register" />
                    <Link className="login-btn login-link" to='/login'>Login to an existing account</Link>
                </Form>
            </div>
        </div>
    )
}

export default Register;