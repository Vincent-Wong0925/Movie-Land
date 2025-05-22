import React, { useEffect, useState } from "react";
import './login.css';
import '../../index.css';
import { Form, Link, useNavigate } from "react-router";
import { loginUser } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthenticated, setAuthenticated, setUser } from "../../store/features/userSlice";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const isAuthenticated = useSelector(selectAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(email, password);

            if (response.error) {
                throw new Error(response.error);
            }
            
            dispatch(setUser(response));
            dispatch(setAuthenticated(true));

            navigate('/');
        } catch (err) {
            console.log(err);
            dispatch(setAuthenticated(false));
            dispatch(setUser({}));
            setEmail('');
            setPassword('');
            setMessage(err.message);

            navigate('/login');
        }
    }

    useEffect(() => {
        if(isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="Login page">
            <div className="login-container">
                <h1>Login to account</h1>
                <Form onSubmit={handleLoginSubmit}>
                    <label className="login-label" htmlFor="form-email">Email</label><br />
                    <input className="login-input" id="form-email" value={email} onChange={e => setEmail(e.target.value)} type="email" required /><br />
                    <label className="login-label" htmlFor="form-password">Password</label><br />
                    <input className="login-input" id="form-password" value={password} onChange={e => setPassword(e.target.value)} type="password" required /><br />
                    {message !== '' && <p className="login-message">{message}</p>}
                    <input className="login-btn" type="submit" value="Login" />
                    <Link className="login-btn login-link" to='/register'>Register a new account</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login;