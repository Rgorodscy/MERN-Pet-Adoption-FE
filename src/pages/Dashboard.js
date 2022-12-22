import React from 'react'
import UsersListContainer from '../components/UsersListContainer';
import PetsListContainer from '../components/PetsListContainer'

function Dashboard() {

  return (
    <div className='d-flex mx-3'>
      <PetsListContainer />
      <UsersListContainer />
    </div>
  )
}

export default Dashboard