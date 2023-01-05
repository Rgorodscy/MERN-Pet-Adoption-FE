import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useNavigate }  from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

function PetAddForm() {
  const {serverUrl, token} = useAuth();
  const navigate = useNavigate();
  const formGroupClass = 'd-flex align-items-baseline justify-content-between mb-2'
  const formLabelClass = 'me-3 text-nowrap'
  const formInputClass = 'w-75'
  const [newPet, setNewPet] = useState({
    type: "",
    name: "",
    adoptionStatus: "",
    height: 0,
    weight: 0,
    color: "",
    bio: "",  
    hypoallergenic: false,
    dietary: "",
    breed: ""
  })

  const [image, setImage] = useState();



  const handleChange = (e) => {
    setNewPet({...newPet, [e.target.name]: e.target.value})
  }

  const handleAdd = async (e) => {
    e.preventDefault();

    const addPet = {
      ...newPet, 
      hypoallergenic: Boolean(newPet.hypoallergenic),
      height: Number(newPet.height),
      weight: Number(newPet.weight),
    }

    const petFormData = new FormData();
    petFormData.append('image', image);
    for (let key in addPet) {
      petFormData.append(key, addPet[key]);
    }

    postPet(petFormData)
  }

  const postPet = async (petFormData) => {
    try{
      const res = await axios.post(`${serverUrl}/pet`, petFormData, {headers: {authorization: `Bearer ${token}`}});
      navigate('/dashboard')
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='d-flex flex-column align-items-center'>
    <h1>Add a new pet</h1>
    <Form className='w-50' onSubmit={handleAdd}>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Type</Form.Label>
        <Form.Select className={formInputClass} defaultValue={0} onChange={handleChange} name="type" required={true}>
          <option value={0} disabled={true}>Select...</option>  
          <option value={"Dog"}>Dog</option>
          <option value={"Cat"}>Cat</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Name</Form.Label>
        <Form.Control className={formInputClass}  type='text' onChange={handleChange} name="name" required={true}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Adoption Status</Form.Label>
        <Form.Select className={formInputClass} defaultValue={0} onChange={handleChange} name="adoptionStatus" required={true}>
          <option value={0} disabled={true}>Select...</option>  
          <option value={"Available"}>Available</option>
          <option value={"Fostered"}>Fostered</option>
          <option value={"Adopted"}>Adopted</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Image</Form.Label>
        <Form.Control className={formInputClass} type='file' onChange={(e) => setImage(e.target.files[0])} name="image" required={true}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Height</Form.Label>
        <Form.Control className={formInputClass} type='number' onChange={handleChange} name="height" required={true}></Form.Control>
      </Form.Group>      
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Weight</Form.Label>
        <Form.Control className={formInputClass} type='number' onChange={handleChange} name="weight" required={true}></Form.Control>
      </Form.Group>      
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Color</Form.Label>
        <Form.Control className={formInputClass} type='text' onChange={handleChange} name="color" required={true}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Bio</Form.Label>
        <Form.Control className={formInputClass} as='textarea' onChange={handleChange} name="bio" required={true}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Hypoallergenic</Form.Label>
        <Form.Select className={formInputClass} defaultValue={0} onChange={handleChange} name="hypoallergenic" required={true}>
          <option value={false} disabled={true}>Select...</option>  
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Dietary Restrictions</Form.Label>
        <Form.Control className={formInputClass} type='text' onChange={handleChange} name="dietary" required={true}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Breed</Form.Label>
        <Form.Control className={formInputClass} type='text' onChange={handleChange} name="breed" required={true}></Form.Control>
      </Form.Group>
      <Button className='mb-2 w-100' type='submit'>Add Pet</Button>
    </Form>
    </div>
  )
}

export default PetAddForm