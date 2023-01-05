import React from 'react';
import {Carousel, Image} from 'react-bootstrap';
import './Carousel.css'

function PetsCarousel() {
  const imageClasslist = "d-block w-100 rounded image"
  
    return (
    <Carousel className='h-25 carousel'>
      <Carousel.Item>
        <Image
          className={imageClasslist}
          src="https://res.cloudinary.com/dyur3xjlc/image/upload/v1672847032/friends-gf702ac59c_1920_rda8zp.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className={imageClasslist}
          src="https://res.cloudinary.com/dyur3xjlc/image/upload/v1672847032/cat-gf903b0144_1920_lx5b2b.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className={imageClasslist}
          src="https://res.cloudinary.com/dyur3xjlc/image/upload/v1672847032/corgi-gdc40b39af_1920_p3cahk.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className={imageClasslist}
          src="https://res.cloudinary.com/dyur3xjlc/image/upload/v1672847032/kitty-g9c5a192f4_1920_q0s8oj.jpg"
          alt="Forth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className={imageClasslist}
          src="https://res.cloudinary.com/dyur3xjlc/image/upload/v1672847036/dachshund-gd89d428d1_1920_wtwb5a.jpg"
          alt="Fifth slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default PetsCarousel;