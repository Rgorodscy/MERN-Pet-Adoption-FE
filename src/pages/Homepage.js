import React, { useEffect, useState } from 'react'
import LoginSignUpModal from '../components/LoginSignUpModal'
import Modal from 'react-bootstrap/Modal'
import CloseButton from 'react-bootstrap/esm/CloseButton';
import { useAuth } from '../contexts/AuthContext';
import Image from 'react-bootstrap/Image'
import Carousel, { CarouselItem } from '../components/Carousel';

function Homepage() {
  const {showLoginModal, setShowLoginModal, currentUser} = useAuth();
  const carouselImages = ["https://res.cloudinary.com/dyur3xjlc/image/upload/v1672847032/friends-gf702ac59c_1920_rda8zp.jpg",
  "https://res.cloudinary.com/dyur3xjlc/image/upload/v1672847032/cat-gf903b0144_1920_lx5b2b.jpg", 
  "https://res.cloudinary.com/dyur3xjlc/image/upload/v1672847032/corgi-gdc40b39af_1920_p3cahk.jpg", 
  "https://res.cloudinary.com/dyur3xjlc/image/upload/v1672847032/kitty-g9c5a192f4_1920_q0s8oj.jpg", 
  "https://res.cloudinary.com/dyur3xjlc/image/upload/v1672847036/dachshund-gd89d428d1_1920_wtwb5a.jpg"]
  const [currentIndex, setCurrentIndex] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {carouselInfiniteScroll()}, 5000)

  //   return () => clearInterval(interval)
  // })

  // const carouselInfiniteScroll = () => {
  //   if(currentIndex === carouselImages.length-1){
  //     return setCurrentIndex(0)
  //   }
  //   return setCurrentIndex(prev => prev + 1)
  // }



  return (
    <div className='d-flex flex-column align-items-center mt-3 text-secondary'>
      <h1>Welcome to the Pet Center of Adoption<br/>
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
 
      <Image src={carouselImages[currentIndex]} width='45%' height='450px' rounded={true} />
      
      <Carousel className=''>
        <CarouselItem>
        <Image key={carouselImages[0]} src={carouselImages[0]} rounded={true} />
        </CarouselItem>
        <CarouselItem>
          <Image key={carouselImages[1]} src={carouselImages[1]} rounded={true} />
        </CarouselItem>
        <CarouselItem>
        <Image key={carouselImages[2]} src={carouselImages[2]} rounded={true} />
        </CarouselItem>
        <CarouselItem>
        <Image key={carouselImages[3]} src={carouselImages[3]} rounded={true} />
        </CarouselItem>
        <CarouselItem>
        <Image key={carouselImages[4]} src={carouselImages[4]} rounded={true} />
        </CarouselItem>
      </Carousel>
      
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