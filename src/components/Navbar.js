import React from 'react'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import { Link, useNavigate }  from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navbar() {
  const navigate = useNavigate();
  const {setShowLoginModal, currentUser, setCurrentUser, setToken, adminUser} = useAuth();

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
    <Nav className='d-flex flex-row justify-content-between align-items-center px-5 py-2 bg-primary'>
      <Button className='me-1 p-2 justify-self-center' variant='light' onClick={() => navigate('/search')}>Search</Button>

      
      
      
      
      <div className='d-flex'>
      <Link to={'/'}>
        <h3 className='text-decoration-none text-light me-3'>Pet Center</h3>
      </Link>
      {currentUser && <NavDropdown title='Pages' className='btn btn-light p-0 text-decoration-none text-danger'>
        <NavDropdown.Item onClick={() => navigate('/mypets')}>My pets</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>

      {adminUser === true &&
        <div>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={() => navigate('/dashboard')}>Dashboard</NavDropdown.Item>
          <NavDropdown.Divider />  
        </div>
      }
      {adminUser === true &&
        <div>
          <NavDropdown.Item onClick={() => navigate('/petadd')}>Add a Pet</NavDropdown.Item>
        </div>
      }
      </NavDropdown>
      }
      <div>
      </div>
      </div>

      <Button className=' p-2' onClick={handleLoginLogout} variant='light' type='submit'>{currentUser ? "Logout" : "Login" }</Button>

    </Nav>
  )
}

export default Navbar