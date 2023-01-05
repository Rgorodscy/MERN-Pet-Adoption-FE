import React from 'react'
import { useParams } from 'react-router-dom';
import PetAddForm from '../components/PetAddForm'
import PetEditForm from '../components/PetEditForm'


function PetAddEdit() {
  const { id } = useParams();

  return (
    <div className='mt-3 text-secondary'>
      {!id && <PetAddForm />}
      {id && <PetEditForm />}
    </div>
  )
}

export default PetAddEdit