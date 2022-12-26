import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios';
import { useNavigate }  from 'react-router-dom'

function ProfileForm() {
  const navigate = useNavigate();
  const {currentUser, setCurrentUser, serverUrl} = useAuth();
  const [newUserInfo, setNewuserInfo] = useState({
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
    setNewuserInfo({...newUserInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const updatedUser = await axios.put(`${serverUrl}/user/${currentUser.id}`, newUserInfo);
    setCurrentUser(updatedUser.data);
    navigate("/mypets")
  }

  return (
    <div className='d-flex flex-column align-items-center text-secondary'>
      <h1>Update Your Profile</h1>
      <Form className='w-50' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='text' value={currentUser.firstName} name="firstName" onChange={handleChange} onLoad={handleChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text' value={currentUser.lastName} name="lastName" onChange={handleChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' value={currentUser.email} name="email" onChange={handleChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type='tel' value={currentUser.phone} name="phone" onChange={handleChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={currentUser.password} name="password" onChange={handleChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' value={currentUser.confirmPassword} name="confirmPassword" onChange={handleChange}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control as='textarea' value={currentUser.bio ? currentUser.bio : ""} name="bio" onChange={handleChange}></Form.Control>
        </Form.Group>
        <Button type="submit" className='mt-2'>Update Profile</Button>
      </Form>
    </div>
  )
}

export default ProfileForm