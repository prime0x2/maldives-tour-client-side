import React from 'react';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';

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
        <div className="page text-center">
            <button className="btn btn-regular mt-5" onClick={handleGoogleLogin}>
                <i className="fab fa-google"></i> &nbsp;Login with Google
            </button>
        </div>
    );
};

export default Account;