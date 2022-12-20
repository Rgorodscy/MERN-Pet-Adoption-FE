import React from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'


function Pet() {
  return (
    <Card>
      <Card.Body>
        <Image height='120px' width='120px' />
        <h1>Pet Name</h1>
        <p>Pet Details</p>
        <Alert></Alert>
        <Button>Change Status</Button>
      </Card.Body>
    </Card>
  )
}

export default Pet