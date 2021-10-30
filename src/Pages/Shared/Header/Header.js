import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../images/logo.png';
import './Header.css';

const Header = () => {
    const { user, logOut } = useAuth();

    return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <a className="navbar-brand text-light" href="/"><img src={logo} alt="" /></a>
                        <a href="/" className="navbar-brand">
                            <h4 className="m-0 fw-bold">Maldives</h4>
                            <h6 className="m-0 fw-bold">Tour & Travel</h6>
                        </a>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon text-light"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink exact to="/" activeClassName="selected" className="nav-link px-4 text-light">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/allAgents" activeClassName="selected" className="nav-link px-4 text-light">Agents</NavLink>
                            </li>
                            {
                                !user && 
                                <li className="nav-item">
                                    <NavLink to="/account" activeClassName="selected" className="nav-link px-4 text-light">Account</NavLink>
                                </li>
                            }
                        </ul>
                        <div>
                            {
                                user &&
                                <div className="dropdown ms-4 my-2">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-circle"></i> &nbsp;{user.displayName}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                        <li className="dropdown-item">
                                            <NavLink to="/manageAll" activeClassName="selected" className="nav-link p-0 text-light">Manage All Bookings</NavLink>
                                        </li>
                                        <li className="dropdown-item">
                                            <NavLink to="/addAgent" activeClassName="selected" className="nav-link p-0 text-light">Add New Agent</NavLink>
                                        </li>
                                        <li className="dropdown-item">
                                            <NavLink to="/bookings" activeClassName="selected" className="nav-link p-0 text-light">My Bookings</NavLink>
                                        </li>
                                        <li className="dropdown-item">
                                            <button className="btn-logout rounded p-0" onClick={logOut}>Logout&nbsp; <i className="fas fa-sign-out-alt"></i></button>
                                        </li>
                                        {/* <li className="nav-item">
                                            <button className="btn-logout px-2 py-1 rounded" onClick={logOut}><i className="fas fa-sign-out-alt"></i> &nbsp;Logout</button>
                                        </li> */}
                                    </ul>
                                </div>
                            }

                            {/* <div className="logged-in d-flex align-items-center ms-5">
                                    <span>Signed in as : <span className="user">{user.displayName}</span></span><button className="btn-logout px-2 py-1 rounded" onClick={logOut}><i className="fas fa-sign-out-alt"></i> &nbsp;Logout</button>
                                </div> */}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;