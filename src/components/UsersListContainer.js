import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import UsersListItem from './UsersListItem'
import {Spinner} from 'react-bootstrap'
function UsersListContainer() {
  const [usersList, setUsersList] = useState([]);
  const {serverUrl, token} = useAuth();

  useEffect(() => {
      fetchAllUsers();
  }, [])
  

  const fetchAllUsers = async () => {
    const allUsers = await axios.get(`${serverUrl}/user`, {headers: {authorization: `Bearer ${token}`}});
    setUsersList(allUsers.data)
  }

  return (
    <div className='w-50 ms-1'>
      <h2>Users</h2>
      <div className=' vh-100 overflow-auto border rounded border-2'>
        {!usersList[0] && <Spinner />}
        {usersList && usersList.map((user) => 
        <UsersListItem key={user.id} user={user} />
        )}
      </div>
    </div>

  )
}

export default UsersListContainer