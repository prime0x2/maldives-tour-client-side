import React from 'react';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import logo from '../../images/logo.png';
import './Account.css';

const Account = () => {

    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/';

    const { googleLogin } = useAuth();

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                history.push(redirect_uri);
            });
    }

    return (
        <div className="page account text-center">
            <div className="account-box my-5">
                <img src={logo} width="150px" alt="" />
                <br /><br />
                <button className="btn btn-regular mt-4" onClick={handleGoogleLogin}>
                    <i className="fab fa-google"></i> &nbsp;Login with Google
                </button>
            </div>
        </div>
    );
};

export default Account;