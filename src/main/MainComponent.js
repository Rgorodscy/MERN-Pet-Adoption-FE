import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar'
import Homepage from '../pages/Homepage';
import MyPets from '../pages/MyPets';
import Profile from '../pages/Profile';
import Pet from '../pages/Pet';
import PetAddEdit from '../pages/PetAddEdit';
import Search from '../pages/Search';
import Dashboard from '../pages/Dashboard';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import AdminRoute from '../components/AdminRoute'

function MainComponent() {

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route path='/search' element={<Search />} />
            <Route path='/pet/:id' element={
            <PrivateRoute>
              <Pet />
            </PrivateRoute>
            } />
            <Route path='/profile' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
            } />
            <Route path='/mypets' element={
            <PrivateRoute>
              <MyPets />
            </PrivateRoute>
            } />
            
            <Route path='/petadd' element={
            <PrivateRoute>
              <AdminRoute>
                <PetAddEdit />
              </AdminRoute>
            </PrivateRoute>
            } />
            <Route path='/petedit/:id' element={
            <PrivateRoute>
              <AdminRoute>
                <PetAddEdit />
              </AdminRoute>
            </PrivateRoute>
            } />
            <Route path='/dashboard' element={
            <PrivateRoute>
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            </PrivateRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default MainComponent