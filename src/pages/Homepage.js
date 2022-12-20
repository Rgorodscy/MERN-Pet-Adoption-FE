import React, { useState, useContext } from 'react'
import LoginSignUpModal from '../components/LoginSignUpModal'
import BasicComponentsContext from '../contexts/BasicComponentsContext'
import Modal from 'react-bootstrap/Modal'
import CloseButton from 'react-bootstrap/esm/CloseButton';

function Homepage() {
  const {showLoginModal, setShowLoginModal} = useContext(BasicComponentsContext);

  return (
    <div>
      <p>Welcome, and more about the service</p>
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