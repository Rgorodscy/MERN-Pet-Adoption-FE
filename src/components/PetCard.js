import React from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function PetCard() {
  return (
    <Card>
      <Card.Body>
        <Image height='60px' width='60px' />
        <h1>Pet Name</h1>
        <Alert></Alert>
        <Button>See More</Button>
      </Card.Body>
    </Card>
  )
}

export default PetCard