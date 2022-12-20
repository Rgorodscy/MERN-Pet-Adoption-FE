import React from 'react'
import PetCard from './PetCard'

function SearchResultsContainer({searchResults}) {
  return (
    <div>
      {searchResults.map(result => {
        <PetCard data={result} />
      })}
    </div>
  )
}

export default SearchResultsContainer