import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'
import { useNavigate }  from 'react-router-dom'

function ProfileForm() {
  const navigate = useNavigate();
  const {currentUser, setCurrentUser, serverUrl , token} = useAuth();
  const [newUserInfo, setNewUserInfo] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: currentUser.phone,
    password: currentUser.password,
    confirmPassword: currentUser.confirmPassword,
    id: currentUser.id, 
    bio: "",
  });

  const handleChange= (e) => {
    setNewUserInfo({...newUserInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await axios.put(`${serverUrl}/user/${currentUser.id}`, newUserInfo, {headers: {authorization: `Bearer ${token}`}});
    if(updatedUser){
      setCurrentUser({...currentUser, ...newUserInfo})
    }
    navigate("/")
  }

  return (
    <div className='d-flex flex-column align-items-center text-secondary mt-3'>
      <h1>Update Your Profile</h1>
      <Form className='w-50' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='text' defaultValue={currentUser.firstName} name="firstName" onChange={handleChange} ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text' defaultValue={currentUser.lastName} name="lastName" onChange={handleChange} ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' defaultValue={currentUser.email} name="email" onChange={handleChange} ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type='tel' defaultValue={currentUser.phone} name="phone" onChange={handleChange} ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' defaultValue={currentUser.password} name="password" onChange={handleChange} ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' defaultValue={currentUser.confirmPassword} name="confirmPassword" onChange={handleChange} ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control as='textarea' defaultValue={currentUser.bio ? currentUser.bio : ""} name="bio" onChange={handleChange} ></Form.Control>
        </Form.Group>
        <Button type="submit" variant='info' className='mt-2'>Update Profile</Button>
      </Form>
    </div>
  )
}

export default ProfileForm