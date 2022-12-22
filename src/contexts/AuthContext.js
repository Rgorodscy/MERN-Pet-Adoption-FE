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
    const [petsList, setPetsList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const serverUrl = "http://localhost:8080"

    useEffect(() => {
      setLoading(false);
      if(currentUser){
        fetchAllPets();
        fetchAllUsers();
      }

    }, [currentUser])
  
    const fetchAllPets = async () => {
      const allPets = await axios.get(`${serverUrl}/pet`);
      setPetsList(allPets.data)
    }
  
    const fetchAllUsers = async () => {
      const allUsers = await axios.get(`${serverUrl}/user`);
      setUsersList(allUsers.data)
    }

    const value = {
        showLoginModal,
        setShowLoginModal, 
        petsList, 
        setPetsList,
        usersList,
        setUsersList,
        currentUser,
        setCurrentUser,
        serverUrl
    }
  
    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}