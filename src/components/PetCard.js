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
    adoptionStatusAlertColor = 'success'
  } else if (pet.adoptionStatus === "Fostered"){
    adoptionStatusAlertColor = 'primary'
  } else {
    adoptionStatusAlertColor = 'secondary'
  }
  
  
  return (
    <Card>
      <Card.Header>
        <h3 className='text-center text-capitalize'>{pet.name}</h3>
      </Card.Header>
      <Card.Body>
        <Image src={pet.image} height='60px' width='60px' />
        <Alert className='mt-3' variant={adoptionStatusAlertColor}>{pet.adoptionStatus}</Alert>
        <Link to={petPageLink} className="btn btn-primary">See More</Link>
      </Card.Body>
    </Card>
  )
}

export default PetCard