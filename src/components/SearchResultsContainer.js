import React from 'react'
import PetCard from './PetCard'

function SearchResultsContainer({searchResults}) {
  return (
    <div className='container mt-4'>
      <div className='row justify-content-center'>
        {searchResults.map(pet => 
          <PetCard key={pet.id} pet={pet} className="col-xs-3"/>
        )}
      </div>
    </div>
  )
}

export default SearchResultsContainer