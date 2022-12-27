import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useNavigate, useParams }  from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

function PetEditForm() {
  const {serverUrl} = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const formGroupClass = 'd-flex align-items-baseline justify-content-between mb-2'
  const formLabelClass = 'me-3 text-nowrap'
  const formInputClass = 'w-75'
  const [newPet, setNewPet] = useState({})

  
  const [petData, setPetData] = useState([])
  
  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    const petId = id.slice(1);
    try{
      const petFound = await axios.get(`${serverUrl}/pet/${petId}`);
      setPetData(petFound.data[0]);
    }catch(err){
      console.log(err)
    }
  }



  const handleChange = (e) => {
    setNewPet({...petData, [e.target.name]: e.target.value})
  }

  const handleEdit = async (e) => {
    e.preventDefault();

    const editPet = {
      ...newPet, 
      hypoallergenic: Boolean(newPet.hypoallergenic),
      height: Number(newPet.height),
      weight: Number(newPet.weight),
    }
    putPet(editPet)
  }

  const putPet = async (editPet) => {
    try{
      const res = await axios.put(`${serverUrl}/pet/${petData.id}`, editPet);
      navigate('/dashboard')
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='d-flex flex-column align-items-center m-2 border border-seconday rounded '>
    <h1>Edit {petData.name}'s info</h1>
    <Form className='w-50' onSubmit={handleEdit}>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Type</Form.Label>
        <Form.Select className={formInputClass} defaultValue={petData.type} onChange={handleChange} name="type">
          <option disabled={true}>Select...</option>  
          <option value={"dog"}>Dog</option>
          <option value={"cat"}>Cat</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Name</Form.Label>
        <Form.Control className={formInputClass}  type='text' onChange={handleChange} name="name" defaultValue={petData.name}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Adoption Status</Form.Label>
        <Form.Select className={formInputClass} onChange={handleChange} name="adoptionStatus" defaultValue={petData.adoptionStatus} >
          <option disabled={true}>Select...</option>  
          <option value={"Available"}>Available</option>
          <option value={"Fostered"}>Fostered</option>
          <option value={"Adopted"}>Adopted</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Image</Form.Label>
        <Form.Control className={formInputClass} type='file' onChange={handleChange} name="image" defaultValue={petData.image}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Height</Form.Label>
        <Form.Control className={formInputClass} type='number' onChange={handleChange} name="height" defaultValue={petData.height}></Form.Control>
      </Form.Group>      
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Weight</Form.Label>
        <Form.Control className={formInputClass} type='number' onChange={handleChange} name="weight" defaultValue={petData.weight} ></Form.Control>
      </Form.Group>      
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Color</Form.Label>
        <Form.Control className={formInputClass} type='text' onChange={handleChange} name="color" defaultValue={petData.color}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Bio</Form.Label>
        <Form.Control className={formInputClass} as='textarea' onChange={handleChange} name="bio" defaultValue={petData.bio}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Hypoallergenic</Form.Label>
        <Form.Select className={formInputClass} onChange={handleChange} name="hypoallergenic" defaultValue={petData.hypoallergenic} >
          <option disabled={true}>Select...</option>  
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Dietary Restrictions</Form.Label>
        <Form.Control className={formInputClass} type='text' onChange={handleChange} name="dietary" defaultValue={petData.dietary}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Breed</Form.Label>
        <Form.Control className={formInputClass} type='text' onChange={handleChange} name="breed" defaultValue={petData.breed}></Form.Control>
      </Form.Group>
      <Button className='mb-2 w-100' type='submit'>Edit Pet</Button>
    </Form>
    </div>
  )
}

export default PetEditForm