import React from 'react'
import Form from 'react-bootstrap/Form'

function ProfileForm() {
  return (
    <div className='d-flex flex-column align-items-center'>
      <h1>Update Your Profile</h1>
      <Form className='w-50'>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='text'></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text'></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email'></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type='tel'></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password'></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control type='textarea'></Form.Control>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ProfileForm