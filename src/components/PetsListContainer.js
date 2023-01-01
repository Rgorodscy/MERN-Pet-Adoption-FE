import React, {useState, useEffect} from 'react'
import PetsListItem from './PetsListItem'
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function PetsListContainer() {
  const [petsList, setPetsList] = useState([]);
  const {serverUrl, currentUser} = useAuth();

  useEffect(() => {
      fetchAllPets();
  }, [])
  
  const fetchAllPets = async () => {
    const allPets = await axios.get(`${serverUrl}/pet`);
    setPetsList(allPets.data)
  }

  return (
    <div className='w-50 me-1'>
      <h2>Pets</h2>
      <div className=' vh-100 overflow-auto border rounded border-2'>
        {petsList && petsList.map((pet) => 
        <PetsListItem key={pet.id} pet={pet} />
        )}
      </div>
    </div>
  )
}

export default PetsListContainer