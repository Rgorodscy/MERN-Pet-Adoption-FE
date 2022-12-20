import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSignUp = (e) => {
    e.preventDefault();

    //Make post request to the server to sign up the user
    
  }


  return (
    <div className='d-flex flex-column align-items-center p-3'>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSignUp}>
        <Form.Group className='mt-2'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' onChange={(e) => setEmail(e.event.target)}></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' onChange={(e) => setPassword(e.event.target)}></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' onChange={(e) => setConfPassword(e.event.target)}></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='text' onChange={(e) => setFirstName(e.event.target)}></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text' onChange={(e) => setLastName(e.event.target)}></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type='tel' onChange={(e) => setPhone(e.event.target)}></Form.Control>
        </Form.Group>

        <Button className='w-100 mt-2'>Sign Up</Button>
      </Form>
    </div>
  )
}

export default SignUp