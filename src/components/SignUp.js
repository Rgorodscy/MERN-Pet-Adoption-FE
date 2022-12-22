import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate }  from 'react-router-dom';


function SignUp() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.value})
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(newUser)
    postUser(newUser);
  }

  const postUser = async (newUser) => {
    try{
      const res = await axios.post("http://localhost:8080/signup/", newUser);
      if(res){
        navigate('/login')
      }
    }catch(err){
      console.log(err);
      alert(err.response.data);
    }
  }

  return (
    <div className='d-flex flex-column align-items-center p-3'>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSignUp}>
        <Form.Group className='mt-2'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' onChange={handleChange} name="email"></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' onChange={handleChange} name="password"></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' onChange={handleChange} name="confirmPassword"></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='text' onChange={handleChange} name="firstName"></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text' onChange={handleChange} name="lastName"></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type='tel' onChange={handleChange} name="phone"></Form.Control>
        </Form.Group>

        <Button className='w-100 mt-2' type='submit'>Sign Up</Button>
      </Form>
    </div>
  )
}

export default SignUp