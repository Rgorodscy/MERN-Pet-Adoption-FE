import React, {useState, useEffect} from 'react'
import {Card, Image, Alert, Button, Spinner} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { BsBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import { useAuth } from '../contexts/AuthContext';


function Pet() {
  const {serverUrl, currentUser, setCurrentUser, token} = useAuth();
  const { id } = useParams();
  const [petData, setPetData] = useState({})
  const petId = id.slice(1);
  const userSavedPets = currentUser.savedPets;
  const userMyPets = currentUser.myPets;
  const petIsSaved = userSavedPets.find((pet) => pet.id === petId);
  const petIsMyPet = userMyPets.find((pet) => pet.id === petId);

  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    try{
      const petFound = await axios.get(`${serverUrl}/pet/${petId}`);
      setPetData(petFound.data[0]);
    }catch(err){
      console.log(err)
    }
  }

  let adoptionStatusAlertColor;

  if(petData.adoptionStatus === "Available") {
    adoptionStatusAlertColor = 'info'
  } else if (petData.adoptionStatus === "Fostered"){
    adoptionStatusAlertColor = 'primary'
  } else {
    adoptionStatusAlertColor = 'secondary'
  }


  const handleSave = async () => {
    const reqBody = {
      userId: currentUser.id
    }
    if(!petIsSaved){
      try{
        const saveRes = await axios.post(`${serverUrl}/pet/${petId}/save`, reqBody, {headers: {authorization: `Bearer ${token}`}});
        setCurrentUser({...currentUser, savedPets: [...currentUser.savedPets,  saveRes.data]})
      }catch(err){
        console.log(err);
      };
    }
    if(petIsSaved){
      try{
        const saveRes = await axios.delete(`${serverUrl}/pet/${petId}/save`, {data: reqBody, headers: {authorization: `Bearer ${token}`}});
        if(saveRes){
          const newSavedPetsArray = currentUser.savedPets.filter((pet) => pet.id !== petId);
          setCurrentUser({...currentUser, savedPets: newSavedPetsArray});
        }
      }catch(err){
        console.log(err);
      };
    }
  }

  const handleAdoptFoster = async (changeType) => {
    const reqBody = {
      userId: currentUser.id,
      type: changeType
    }
    try{
      const adoptFosterRes = await axios.post(`${serverUrl}/pet/${petId}/adopt`, reqBody, {headers: {authorization: `Bearer ${token}`}});
      setCurrentUser({...currentUser, myPets: [...currentUser.myPets,  adoptFosterRes.data]});
      setPetData(adoptFosterRes.data);
    }catch(err){
      console.log(err);
    }
  }

  const handleReturn = async () => {
    const reqBody = {
      userId: currentUser.id
    }
    try{
      const returnRes = await axios.post(`${serverUrl}/pet/${petId}/return`, reqBody, {headers: {authorization: `Bearer ${token}`}});
      const newMyPetsArray = currentUser.myPets.filter((pet) => pet.id !== petId);
      setCurrentUser({...currentUser, myPets: newMyPetsArray});
      setPetData(returnRes.data);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      {!petData.id && <Spinner className='mt-3 text-secondary' />}  
      {petData.id &&
        
          <Card className='text-secondary'>
            <Card.Body className='d-flex flex-column align-items-center  mt-3'>
              <Image src={petData.image} height='240px' width='240px' className='rounded' />
              <h1>{petData.name}</h1>
              <div className='w-50'>
                <p className='border border-secondary rounded'>Details:  <br/>
                  Height: {petData.height} <br/>
                  Weight: {petData.weight} <br/>
                  Color: {petData.color} <br/>
                  Bio: {petData.bio} <br/>
                  Hypoallergenic: {petData.hypoallergenic} <br/>
                  Dietary Restrictions: {petData.dietary} <br/>
                  Breed: {petData.breed} <br/>
                </p>
                <Alert variant={adoptionStatusAlertColor}>{petData.adoptionStatus}</Alert>
              </div>
              <div className='d-flex w-50 justify-content-around mb-3'>
              {(petData.adoptionStatus === "Available" && <Button onClick={() => handleAdoptFoster("Adopt")} variant='info'>Adopt</Button>) || (petIsMyPet && petData.adoptionStatus === "Fostered" && <Button onClick={() => handleAdoptFoster("Adopt")}>Adopt</Button>)}
              {petData.adoptionStatus === "Available" && <Button onClick={() => handleAdoptFoster("Foster")} >Foster</Button>}
              {petIsMyPet && <Button onClick={handleReturn} variant='secondary'>Return</Button>}
                <Link onClick={handleSave} className='h4'>
                  {petIsSaved && <BsBookmarkHeartFill />}
                  {!petIsSaved  && <BsBookmarkHeart />}
                </Link>
              </div>
            </Card.Body>
          </Card>
      }
    </div>
  )
}

export default Pet