import React from 'react'
import {Link} from 'react-router-dom'

function PetsListItem({pet}) {
  const petPageLink = `/pet/:${pet.id}`

  
  return (
    <Link to={petPageLink} className='
    bg-light 
    text-secondary 
    border-bottom border-secondary rounded 
    d-block text-decoration-none 
    py-1 my-1'>
      {pet.name} 
    </Link>
  )
}

export default PetsListItem