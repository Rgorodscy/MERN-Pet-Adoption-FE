import React from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function PetCard({pet}) {
  return (
    <Card>
      <Card.Body>
        <Image src={pet.image} height='60px' width='60px' />
        <h1>{pet.name}</h1>
        <Alert>{pet.adoptionStatus}</Alert>
        <Button>See More</Button>
      </Card.Body>
    </Card>
  )
}

export default PetCard