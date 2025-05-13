import React from "react";
import '../../index.css';
import './navigation.css';
import { NavLink } from "react-router";

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="nav-item lime">
                <svg viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
                    <path d="M15.2391 7.25C15.5625 6.74485 15.75 6.14432 15.75 5.5C15.75 3.70507 14.2949 2.25 12.5 2.25C11.3108 2.25 10.2709 2.88866 9.70433 3.84168C9.23578 3.47117 8.64372 3.25 8 3.25C6.48122 3.25 5.25 4.48122 5.25 6C5.25 6.45011 5.35814 6.87497 5.54985 7.25H4.75C3.50736 7.25 2.5 8.25736 2.5 9.5V17.5C2.5 18.7426 3.50736 19.75 4.75 19.75H16.25C16.4053 19.75 16.557 19.7343 16.7035 19.7043C17.7287 19.4945 18.5 18.5873 18.5 17.5V9.5C18.5 8.25736 17.4926 7.25 16.25 7.25H15.2391ZM12.5 3.75C13.4665 3.75 14.25 4.5335 14.25 5.5C14.25 6.4665 13.4665 7.25 12.5 7.25C11.5335 7.25 10.75 6.4665 10.75 5.5C10.75 4.5335 11.5335 3.75 12.5 3.75ZM8 4.75C8.69036 4.75 9.25 5.30964 9.25 6C9.25 6.69036 8.69036 7.25 8 7.25C7.30964 7.25 6.75 6.69036 6.75 6C6.75 5.30964 7.30964 4.75 8 4.75Z" />
                    <path d="M19.4849 9.18422C19.4949 9.28813 19.5 9.39347 19.5 9.5V17.5C19.5 17.6066 19.4949 17.7119 19.4848 17.8158L20.5663 18.5224C21.3977 19.0655 22.5 18.469 22.5 17.4759V9.52416C22.5 8.53106 21.3977 7.93453 20.5663 8.47769L19.4849 9.18422Z" />
                </svg>
            </div>
            <NavLink className="nav-item nav-link white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
                <div className="nav-tooltip">
                    Tooltip
                </div>
            </NavLink>
            <NavLink className="nav-item nav-link white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
                    <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                </svg>
                <div className="nav-tooltip">
                    Tooltip
                </div>
            </NavLink>
            <NavLink className="nav-item nav-link white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg>
                <div className="nav-tooltip">
                    Tooltip
                </div>
            </NavLink>
        </div>
    )
}

export default Navigation;