import React, { useState } from 'react'
import PetCard from '../components/PetCard'

function MyPets() {
  const [mypets, setMypets] = useState([])
  
  return (
    <div>
      <h1>My Pets</h1>
      {mypets.map(pet => {
      <PetCard pet={pet} />
      })}
    </div>
  )
}

export default MyPets