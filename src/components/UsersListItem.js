import React from 'react'

function UsersListItem({user}) {
  return (
    <p  className='
    bg-light 
    text-secondary 
    border-bottom border-secondary rounded 
    d-block text-decoration-none 
    py-1 my-1'>
      {user.firstName} {user.lastName} 
    </p>
  )
}

export default UsersListItem