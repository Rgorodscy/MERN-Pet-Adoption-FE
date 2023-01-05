import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'

import { Link, useNavigate }  from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SearchBar from './SearchBar'
import CloseButton from 'react-bootstrap/esm/CloseButton'


function Navbar() {
  const navigate = useNavigate();
  const {setShowLoginModal, currentUser, setCurrentUser, setToken, adminUser} = useAuth();
  const [searchClicked, setSearchClicked] = useState(false)

  const handleLoginLogout = (e) => {
    if(!currentUser) {
      e.preventDefault();
      navigate('/');
      setShowLoginModal(true)
    }
    if(currentUser){
      setCurrentUser();
      setToken();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
      setShowLoginModal(false)
    }
  }
  

  return (
    <Nav className='d-flex flex-column px-5 py-2 bg-info'>
      <div className='d-flex flex-row justify-content-between'>
        <Button className='me-1 p-2 justify-self-center' variant='light' onClick={() => setSearchClicked(!searchClicked)}>Search</Button>
        <h3 onClick={() => navigate('/')} className='text-light me-3' role='button'>Pet Center</h3>
        <Button className=' p-2' onClick={handleLoginLogout} variant='light' type='submit'>{currentUser ? "Logout" : "Login" }</Button>
      </div>
      <div className='d-flex justify-content-center'>
        {currentUser && <div className='d-flex'>
          <Button className='btn-light me-2' onClick={() => navigate('/mypets')}>My Pets</Button>
          <Button className='btn-light me-2' onClick={() => navigate('/myprofile')}>Profile</Button>
          {adminUser === true &&
            <Button className='btn-light me-2' onClick={() => navigate('/dashboard')}>Dashboard</Button>
          }
          {adminUser === true &&
            <Button className='btn-light me-2' onClick={() => navigate('/petadd')}>Add a Pet</Button>
          }
        </div>}

      </div>

        <Modal show={searchClicked} backdrop='static' >
          <div className='d-flex flex-column align-items-center text-secondary m-1 p-2 border border-secondary rounded'>
          <CloseButton onClick={() => setSearchClicked(!searchClicked)} className='align-self-end'/>
          <SearchBar setSearchClicked={setSearchClicked} />
          </div>
        </Modal>

    </Nav>
  )
}

export default Navbar