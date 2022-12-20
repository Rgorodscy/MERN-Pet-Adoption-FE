import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  
  const handleLogin = (e) => {
    e.preventDefault();

    //Make post request to the server to login the user
    
  }

  return (
    <div className='d-flex flex-column align-items-center p-3'>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className='mt-2'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' onChange={(e) => setEmail(e.event.target)}></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' onChange={(e) => setPassword(e.event.target)}></Form.Control>
        </Form.Group>
        <Button className='w-100 mt-2'>Login</Button>
      </Form>
    </div>
  )
}

export default Login