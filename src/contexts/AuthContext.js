import { signOut, signInWithPopup } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase-config'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);


      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
      }, [])

    const value = {
        currentUser,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};
