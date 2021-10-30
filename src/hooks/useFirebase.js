import initAuthentication from "../Firebase/firebase.init";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";


initAuthentication();

const useFirebase = () => {
    
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    const auth = getAuth();
    
    
    /* ---------------- Sign In Using Google ---------------- */
    const googleLogin = () => {
        setError('');
        setLoading(true);
        const googleProvider = new GoogleAuthProvider();
        
        return (
            signInWithPopup(auth, googleProvider)
                .catch((error) => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                })
        );
    };
    
    /* ------------------ Sign Out / Log Out ------------------ */
    const logOut = () => {
        setError('');
        setLoading(true);
        
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    
    /* ------------ Check Currently signed-in User ------------ */
    useEffect(() => {
        setLoading(true);
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
            setLoading(false);
        });
        
        return unsubscribed;
    }, [auth]);
    
    /*----------------- Some Custom Error Message----------------- */
    useEffect(() => {
        if (error === "Firebase: Error (auth/user-not-found).") {
            setError("There is no account with this Email");
        }
        if (error === "Firebase: Error (auth/email-already-in-use).") {
            setError("This email already have an account.");
        }
        if (error === "Firebase: Error (auth/wrong-password).") {
            setError("You have entered wrong Password.");
        }
    }, [error]);
    
    
    return {
        user,
        error,
        loading,
        logOut,
        googleLogin
    };
};


export default useFirebase;