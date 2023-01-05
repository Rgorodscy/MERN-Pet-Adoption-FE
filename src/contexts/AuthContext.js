import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = React.createContext()

export function useAuth () {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const serverUrl = process.env.SERVER_URL || "http://localhost:8080"
    const [token, setToken] = useState(localStorage.getItem('token'));
    const adminUser = currentUser ? currentUser.isAdmin : null;

    useEffect(() => {
      setLoading(false);
    }, [currentUser, token])

    const value = {
        showLoginModal,
        setShowLoginModal,
        currentUser,
        setCurrentUser,
        serverUrl,
        token,
        setToken,
        adminUser
    }
  
    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}