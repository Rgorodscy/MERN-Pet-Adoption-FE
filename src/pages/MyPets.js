import React, { useEffect, useState } from 'react'
import PetCard from '../components/PetCard'
import Form from 'react-bootstrap/Form'
import {useAuth} from '../contexts/AuthContext'

function MyPets() {
  const [userPetsList, setUserPetsList] = useState([])
  const {currentUser} = useAuth();
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
      <PetCard key={pet.id} pet={pet} />
      )}
    </div>
  )
}

export default MyPets