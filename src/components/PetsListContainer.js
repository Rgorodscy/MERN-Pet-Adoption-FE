import React, {useState, useEffect} from 'react'
import PetsListItem from './PetsListItem'
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from 'react-bootstrap';

function PetsListContainer() {
  const [petsList, setPetsList] = useState([]);
  const {serverUrl, setShowNotificationToast, setToastMessage} = useAuth();

  useEffect(() => {
      fetchAllPets();
  }, [])
  
  const fetchAllPets = async () => {
    try{
      const allPets = await axios.get(`${serverUrl}/pet`, {withCredentials: true});
      setPetsList(allPets.data)
    }catch(err){
      console.log(err);
      const errorMessage = typeof err.response.data === "string" ? err.response.data : err.response.statusText;
      setToastMessage({variant: 'Danger', messageType: 'Error', message: errorMessage});
      setShowNotificationToast(true);      
    }
  }

  return (
    <div className='w-50 me-1'>
      <h2>Pets</h2>
      <div className=' vh-100 overflow-auto border rounded border-2 shadow-sm'>
        {!petsList[0] && <Spinner />}
        {petsList && petsList.map((pet) => 
        <PetsListItem key={pet.id} pet={pet} />
        )}
      </div>
    </div>
  )
}

export default PetsListContainer