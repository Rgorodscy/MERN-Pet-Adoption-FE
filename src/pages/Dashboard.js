import React from 'react'
import UsersListContainer from '../components/UsersListContainer';
import PetsListContainer from '../components/PetsListContainer'

function Dashboard() {

  return (
    <div className='d-flex flex-column m-3 text-secondary'>
      <h1>Dashboard</h1>
      <div className='d-flex'>
        <PetsListContainer />
        <UsersListContainer />
      </div>
    </div>
  )
}

export default Dashboard