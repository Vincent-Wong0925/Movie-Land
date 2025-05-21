import React from "react";
import './login.css';
import '../../index.css';
import { Form } from "react-router";

const Login = () => {
    return (
        <div className="Login page">
            <div className="login-container">
                <h1>Login to account</h1>
                <Form>
                    <label className="login-label" htmlFor="form-email">Email</label><br />
                    <input className="login-input" id="form-email" type="email" required /><br />
                    <label className="login-label" htmlFor="form-password">Password</label><br />
                    <input className="login-input" id="form-password" type="password" required /><br />
                    <input className="login-btn" type="submit" value="Login" />
                    <input className="login-btn" type="button" value="Register"/>
                </Form>
            </div>
        </div>
    )
}

export default Login;