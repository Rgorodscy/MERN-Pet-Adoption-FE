import React from 'react'
import UsersListItem from './UsersListItem'

function UsersListContainer({users}) {
  return (
    <div>
      {users.map(result => {
      <UsersListItem data={result} />
      })}
    </div>
  )
}

export default UsersListContainer