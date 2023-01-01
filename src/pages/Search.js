import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResultsContainer from '../components/SearchResultsContainer'


function Search() {
  const [searchResults, setSearchResults] = useState([])
  
  return (
    <div className='text-secondary mt-3'>
      <h1>Search your Pet</h1>
      <div className='d-flex flex-column align-items-center'>
        <SearchBar setSearchResults={setSearchResults} />
        <SearchResultsContainer searchResults={searchResults} />
      </div>
    </div>
  )
}

export default Search