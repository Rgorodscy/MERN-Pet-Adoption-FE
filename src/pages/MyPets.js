import React, { useEffect, useState } from 'react';
import {Form, Col} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import PetCard from '../components/PetCard';

function MyPets() {
  const {currentUser} = useAuth();
  const [userPetsList, setUserPetsList] = useState(currentUser.myPets)
  const [savedPets, setSavedPets] = useState(false)
    
  useEffect(() => {
    if(!savedPets){
      setUserPetsList(currentUser.myPets)
    }
    if(savedPets){
      setUserPetsList(currentUser.savedPets)
    }
  }, [savedPets])

  return (
    <div className='d-flex flex-column align-items-center text-secondary'>
      <div className='my-3'>
        <h1>My Pets</h1>
        <Form.Check type='switch' id='mypets-savedpets' label="I want to see my Saved Pets" onChange={() => setSavedPets(!savedPets)} value={savedPets} />
      </div>
      {!userPetsList[0] && !savedPets ? <h2>You currently do not own or foster any pets</h2> : ""}
      {!userPetsList[0] && savedPets ? <h2>You currently do not have any pets saved</h2> : ""}
      {userPetsList.map(pet => 
      <Col 
      xs={{ span: 6 }} sm={{ span: 4 }} md={{ span: 3 }}
      className='m-2'>
        <PetCard key={pet.id} pet={pet} />
      </Col>
      )}
    </div>
  )
}

export default MyPets