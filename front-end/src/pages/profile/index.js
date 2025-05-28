import React, { useEffect } from "react";
import './profile.css';
import '../../index.css';
import { useDispatch, useSelector } from "react-redux";
import { selectAuthenticated, selectUser, setAuthenticated, setUser } from "../../store/features/userSlice";
import { useNavigate } from "react-router";
import { logoutUser } from "../../api";
import { checkAuthenticated } from "../../util";

const Profile = () => {
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectAuthenticated);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        checkAuthenticated(dispatch);
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [dispatch, isAuthenticated, navigate]);

    const handleLogout = () => {
        logoutUser()
            .then(response => {
                dispatch(setAuthenticated(false));
                dispatch(setUser({}));
                console.log('Logout successfully');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="Profile page">
            <div className="profile-container">
                <svg xmlns="http://www.w3.org/2000/svg" height='128' fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
                <h1>{user.username}</h1>
                <p>Email: {user.email}</p>
                <button className="profile-logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Profile;