import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = React.createContext()

export function useAuth () {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [petsList, setPetsList] = useState([]);
  
    useEffect(() => {
      fetchAllPets();
      setLoading(false);

    }, [])
  
    const fetchAllPets = async () => {
      const allPets = await axios.get("http://localhost:8080/pet");
      setPetsList(allPets.data)
    }
  
    const value = {
        showLoginModal,
        setShowLoginModal, 
        petsList, 
        setPetsList,
    }
  
    return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}