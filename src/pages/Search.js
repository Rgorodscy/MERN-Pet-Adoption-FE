import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'
import SearchResultsContainer from '../components/SearchResultsContainer'

function Search() {
  const [searchResults, setSearchResults] = useState([])
  const {serverUrl} = useAuth();
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get('type'); 
  const adoptionStatus = queryParams.get('adoptionStatus');
  const height = queryParams.get('height');
  const weight = queryParams.get('weight');
  const name = queryParams.get('name');
  const searchObject = {
    type: type,
    adoptionStatus: adoptionStatus,
    height: height,
    weight: weight,
    name: name,
  }

  useEffect(() => {
    handleSearch()
  }, [searchObject]) 

  const handleSearch = async () => {
    try{
      const searchResponse = await axios.get(`${serverUrl}/pet/`, {params: searchObject});
      setSearchResults(searchResponse.data)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='text-secondary mt-3'>
      <h1>Pets Found:</h1>
      {!searchResults[0] && <Spinner className='mt-5' />}
      <SearchResultsContainer searchResults={searchResults} />
    </div>
  )
}

export default Search