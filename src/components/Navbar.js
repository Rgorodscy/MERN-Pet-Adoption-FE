import React, {useContext} from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import { useNavigate }  from 'react-router-dom'
import BasicComponentsContext from '../contexts/BasicComponentsContext';

function Navbar() {
  const navigate = useNavigate();
  const {setShowLoginModal} = useContext(BasicComponentsContext);

  const handleLoginOpen = () => {
    setShowLoginModal(true)
  }

  return (
    <Nav className='d-flex flex-row justify-content-between px-5 py-2 bg-primary text-light'>
      <Button variant='light' onClick={() => navigate('/search')}>Search</Button>
      <h1>Pet Adoption</h1>
      <Button onClick={handleLoginOpen} variant='light'>Login</Button>
    </Nav>
  )
}

export default Navbar