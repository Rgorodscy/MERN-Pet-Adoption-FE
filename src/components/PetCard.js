import React from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

function PetCard({pet}) {
  const petPageLink = `/pet/:${pet.id}`
  
  let adoptionStatusAlertColor;
  if(pet.adoptionStatus === "Available") {
    adoptionStatusAlertColor = 'primary'
  } else if (pet.adoptionStatus === "Fostered"){
    adoptionStatusAlertColor = 'secondary'
  } else {
    adoptionStatusAlertColor = 'success'
  }
  
  
  return (
    <Card className='w-25 m-2'>
      <Card.Body>
        <Image src={pet.image} height='60px' width='60px' />
        <h3 className='text-center text-capitalize'>{pet.name}</h3>
        <Alert variant={adoptionStatusAlertColor}>{pet.adoptionStatus}</Alert>
        <Link to={petPageLink} className="btn btn-primary">See More</Link>
      </Card.Body>
    </Card>
  )
}

export default PetCard