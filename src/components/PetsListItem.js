import React from 'react'
import {Link} from 'react-router-dom'

function PetsListItem({pet}) {
  const petPageLink = `/pet/:${pet.id}`

  
  return (
    <Link to={petPageLink} className='border-bottom border-secondary d-block text-decoration-none text-secondary'>
      {pet.name} 
    </Link>
  )
}

export default PetsListItem