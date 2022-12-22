import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate }  from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    postUser(user);
  }

  const postUser = async (user) => {
    try{
      const res = await axios.post("http://localhost:8080/login/", user);
      setCurrentUser(res.data) 
      //Set currentUser in AuthContext with res.data
      navigate('/mypets')
    }catch(err){
      console.log(err);
      alert(err.response.data);
    }
  }

  return (
    <div className='d-flex flex-column align-items-center p-3'>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group className='mt-2'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' onChange={handleChange} name="email"></Form.Control>
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' onChange={handleChange} name="password"></Form.Control>
        </Form.Group>
        <Button className='w-100 mt-2' type='submit'>Login</Button>
      </Form>
    </div>
  )
}

export default Login