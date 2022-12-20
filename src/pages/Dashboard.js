import React, { useState } from 'react'
import UsersListContainer from '../components/UsersListContainer';
import PetsListContainer from '../components/PetsListContainer'

function Dashboard() {
  const [users, setusers] = useState([]);
  const [pets, setPets] = useState([]);

  //Create UseEffect that fetches the data from the server
  
  return (
    <div>
      <UsersListContainer users={users} />
      <PetsListContainer pets={pets} />
    </div>
  )
}

export default Dashboard