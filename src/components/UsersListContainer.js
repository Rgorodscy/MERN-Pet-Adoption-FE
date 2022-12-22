import React from 'react'
import UsersListItem from './UsersListItem'
import { useAuth } from '../contexts/AuthContext';

function UsersListContainer() {
  const {usersList} = useAuth();

  return (
    <div className='w-50 ms-1'>
      <h2 className='text-secondary'>Users</h2>
      <div className=' vh-100 overflow-auto border rounded border-2'>
        {usersList && usersList.map((user) => 
        <UsersListItem key={user.id} user={user} />
        )}
      </div>
    </div>

  )
}

export default UsersListContainer