import React, { useContext, useState, useEffect } from 'react'

const AuthContext = React.createContext()

export function useAuth () {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const serverUrl = process.env.REACT_APP_SERVER_URL
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