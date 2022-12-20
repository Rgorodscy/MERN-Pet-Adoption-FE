import React from 'react'
import PetsListItem from './PetsListItem'

function PetsListContainer({pets}) {
  return (
    <div>
      {pets.map(result => {
      <PetsListItem data={result} />
      })}
    </div>
  )
}

export default PetsListContainer