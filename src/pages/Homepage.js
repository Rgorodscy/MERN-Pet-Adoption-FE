import React from 'react'
import LoginSignUpModal from '../components/LoginSignUpModal'
import Modal from 'react-bootstrap/Modal'
import CloseButton from 'react-bootstrap/esm/CloseButton';
import { useAuth } from '../contexts/AuthContext';

function Homepage() {
  const {showLoginModal, setShowLoginModal, currentUser} = useAuth();

  return (
    <div className='d-flex flex-column align-items-center mt-3'>
      <h1>Welcome to the pet center of adoption<br/>
        {currentUser && 
          ` ${currentUser.firstName} ${currentUser.lastName}`
          }
      </h1>
      <p className='text-justify w-50 mt-3'>We bring you a great platform to find your next puppy.
      We have some options on how to proceed.
      The first thing is to create an account, after that, you will
      be able to use our services and search for your dream pet.
      We have options to foster a pet, you can think about it as a "Test-Drive".
      Go on and let's find together a new member to your family.
      </p>
      
      <Modal
      show={showLoginModal}
      className='d-flex'
      backdrop='static'
      >
        
        {showLoginModal && 
          <div className='m-2 p-1 border border-secondary rounded'>
          <div className='d-flex justify-content-end'>
            <CloseButton onClick={() => setShowLoginModal(false)}  />
          </div>
            <LoginSignUpModal />
          </div>
        }
      </Modal>
    </div>
  )
}

export default Homepage