import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import SearchResultsContainer from '../components/SearchResultsContainer'


function Search() {
  const [searchResults, setSearchResults] = useState([])
  
  return (
    <div className='d-flex flex-column align-items-center'>
      <SearchBar setSearchResults={setSearchResults} />
      <SearchResultsContainer searchResults={searchResults} />
    </div>
  )
}

export default Search