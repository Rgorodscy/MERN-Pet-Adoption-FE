import React from 'react'
import {Modal, CloseButton} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import LoginSignUpModal from '../components/LoginSignUpModal'
import PetsCarousel from '../components/Carousel';

function Homepage() {
  const {showLoginModal, setShowLoginModal, currentUser, error} = useAuth();

  return (
    <div className='d-flex flex-column align-items-center mt-3 text-secondary'>
      <h1>Welcome to the Pet Center of Adoption<br/>
        {currentUser && 
          <div>
            <span className='text-capitalize'>{currentUser.firstName}</span> 
            <span className='text-capitalize'> {currentUser.lastName}!</span>
          </div>
          }
      </h1>
      <p className='text-justify w-50 mt-3'>We bring you a great platform to find your next puppy.
      We have some options on how to proceed.
      The first thing is to create an account, after that, you will
      be able to use our services and search for your dream pet.
      We have options to foster a pet, you can think about it as a "Test-Drive".
      Go on and let's find together a new member to your family.
      </p>
 
      <PetsCarousel className='carousel'  />

      <Modal
      show={showLoginModal}
      onHide={() => setShowLoginModal(false)}
      className='d-flex'
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