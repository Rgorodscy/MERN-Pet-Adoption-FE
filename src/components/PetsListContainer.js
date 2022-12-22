import React, {useContext} from 'react'
import PetsListItem from './PetsListItem'
import { useAuth } from '../contexts/AuthContext';

function PetsListContainer() {
  const {petsList} = useAuth();

  return (
    <div className='w-50 me-1'>
      <h2 className='text-secondary'>Pets</h2>
      <div className=' vh-100 overflow-auto border rounded border-2'>
        {petsList && petsList.map((pet) => 
        <PetsListItem key={pet.id} pet={pet} />
        )}
      </div>
    </div>
  )
}

export default PetsListContainer