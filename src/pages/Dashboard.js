import React, { useEffect, useState, useContext } from 'react'
import UsersListContainer from '../components/UsersListContainer';
import PetsListContainer from '../components/PetsListContainer'
import BasicComponentsContext from '../contexts/BasicComponentsContext';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
  const [users, setusers] = useState([]);

  return (
    <div>
      <UsersListContainer users={users} />
      <PetsListContainer />
    </div>
  )
}

export default Dashboard