import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar'
import Homepage from '../pages/Homepage';
import MyPets from '../pages/MyPets';
import Profile from '../pages/Profile';
import Pet from '../pages/Pet';
import PetAdd from '../pages/PetAdd';
import Search from '../pages/Search';
import Dashboard from '../pages/Dashboard';
import { AuthProvider } from '../contexts/AuthContext';


function MainComponent() {

  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route path='/mypets' element={<MyPets />} />
            <Route path='/profile' element={<Profile />} />
            <Route exact path='/pet' element={<Pet />} />
            <Route path='/pet/:id' element={<Pet />} />
            <Route path='/petadd' element={<PetAdd />} />
            <Route path='/search' element={<Search />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default MainComponent