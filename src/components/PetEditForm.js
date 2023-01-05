import React, { useState, useEffect } from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios';
import { useNavigate, useParams }  from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

function PetEditForm() {
  const {serverUrl, token} = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const formGroupClass = 'd-flex align-items-baseline justify-content-between mb-2'
  const formLabelClass = 'me-3 text-nowrap'
  const formInputClass = 'w-75'
  const [image, setImage] = useState();
  const [petData, setPetData] = useState([])
  const [newPet, setNewPet] = useState(petData)
  
  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    const petId = id.slice(1);
    try{
      const petFound = await axios.get(`${serverUrl}/pet/${petId}`, {headers: {authorization: `Bearer ${token}`}});
      setPetData(petFound.data[0]);
    }catch(err){
      console.log(err)
    }
  }

  console.log(newPet)

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

    const petFormData = new FormData();
    petFormData.append('image', image);
    for (let key in editPet) {
      petFormData.append(key, editPet[key]);
    }


    putPet(petFormData)
  }

  const putPet = async (petFormData) => {
    try{
      const res = await axios.put(`${serverUrl}/pet/${petData.id}`, petFormData, {headers: {authorization: `Bearer ${token}`}});
      if(res){
        navigate('/dashboard')
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='d-flex flex-column align-items-center'>
    <h1>Edit {petData.name}'s info</h1>
    <Form className='w-50' onSubmit={handleEdit}>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Type</Form.Label>
        <Form.Select className={formInputClass} defaultValue={petData.type} onChange={handleChange} name="type" required={true}>
          <option disabled={true}>Select...</option>  
          <option value={"Dog"}>Dog</option>
          <option value={"Cat"}>Cat</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Name</Form.Label>
        <Form.Control className={formInputClass}  type='text' onChange={handleChange} name="name" defaultValue={petData.name} required={true}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Adoption Status</Form.Label>
        <Form.Select className={formInputClass} onChange={handleChange} name="adoptionStatus" defaultValue={petData.adoptionStatus} required={true}>
          <option disabled={true}>Select...</option>  
          <option value={"Available"}>Available</option>
          <option value={"Fostered"}>Fostered</option>
          <option value={"Adopted"}>Adopted</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Image</Form.Label>
        <Form.Control className={formInputClass} type='file' onChange={(e) => setImage(e.target.files[0])} name="image" defaultValue={petData.image} required={true}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Height</Form.Label>
        <Form.Control className={formInputClass} type='number' onChange={handleChange} name="height" defaultValue={petData.height} required={true}></Form.Control>
      </Form.Group>      
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Weight</Form.Label>
        <Form.Control className={formInputClass} type='number' onChange={handleChange} name="weight" defaultValue={petData.weight} required={true}></Form.Control>
      </Form.Group>      
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Color</Form.Label>
        <Form.Control className={formInputClass} type='text' onChange={handleChange} name="color" defaultValue={petData.color} required={true}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Bio</Form.Label>
        <Form.Control className={formInputClass} as='textarea' onChange={handleChange} name="bio" defaultValue={petData.bio} required={true}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Hypoallergenic</Form.Label>
        <Form.Select className={formInputClass} onChange={handleChange} name="hypoallergenic" defaultValue={petData.hypoallergenic} required={true}>
          <option disabled={true}>Select...</option>  
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Dietary Restrictions</Form.Label>
        <Form.Control className={formInputClass} type='text' onChange={handleChange} name="dietary" defaultValue={petData.dietary} required={true}></Form.Control>
      </Form.Group>
      <Form.Group className={formGroupClass}>
        <Form.Label className={formLabelClass}>Breed</Form.Label>
        <Form.Control className={formInputClass} type='text' onChange={handleChange} name="breed" defaultValue={petData.breed} required={true}></Form.Control>
      </Form.Group>
      <Button className='mb-2 w-100' disabled={!newPet.type} type='submit'>Edit Pet</Button>
    </Form>
    </div>
  )
}

export default PetEditForm