import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


export default function PrivateRoute({ redirectPath = "/", children, }) {
  const { adminUser } = useAuth();
  
    if (adminUser != true) {
        return <Navigate to={redirectPath} replace />;
        }
    
        return children;
  
}
