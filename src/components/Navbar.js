import React, {useContext} from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import { useNavigate }  from 'react-router-dom'
import BasicComponentsContext from '../contexts/BasicComponentsContext';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const {setShowLoginModal, currentUser, setCurrentUser} = useAuth();

  const handleLoginLogout = (e) => {
    if(!currentUser) {
      e.preventDefault();
      navigate('/');
      setShowLoginModal(true)
    }
    if(currentUser){
      setCurrentUser();
      navigate('/');
      setShowLoginModal(false)
    }
  }

  return (
    <Nav className='d-flex flex-row justify-content-between align-items-center px-5 py-2 bg-primary text-light'>
      <div>
      <Button className='me-1' variant='light' onClick={() => navigate('/')}>Home</Button>
      <Button variant='light' onClick={() => navigate('/search')}>Search</Button>
      <Button variant='light' onClick={() => navigate('/dashboard')}>Dashboard</Button>
      <Button variant='light' onClick={() => navigate('/mypets')}>My Pets</Button>
      <Button variant='light' onClick={() => navigate('/petadd')}>Pet Add</Button>
      <Button variant='light' onClick={() => navigate('/profile')}>Profile</Button>

      </div>
      <h2>Pet Center</h2>
      <div>
      <Button onClick={handleLoginLogout} variant='light' type='submit'>{currentUser ? "Logout" : "Login" }</Button>
      </div>
    </Nav>
  )
}

export default Navbar