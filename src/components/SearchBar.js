import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios';

function SearchBar({setSearchResults}) {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchObject, setSearchObject] = useState({});
  const {currentUser, serverUrl} = useAuth();
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setSearchObject({...searchObject,  [e.target.name]: e.target.value})
  }

  console.log(searchObject)

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);
    try{
      const searchResponse = await axios.get(`${serverUrl}/pet/`, {params: searchObject});
      setSearchResults(searchResponse.data)
    }catch(err){
      console.log(err)
    }
    //Send request to the server with the values from the search
  }

  const handleClear = () => {
    setSearched(false);
    setSearchObject({});
    setSearchResults([])
  }

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Form.Check type='switch' id='basic-advanced-search' label='Advanced Search' onChange={() => setAdvancedSearch(!advancedSearch)} />
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Select defaultValue={0} onChange={handleChange} name='type'>
            <option value={0} disabled>Select...</option>
            <option value={"Dog"} >Dog</option>
            <option value={"Cat"} >Cat</option>
          </Form.Select>
        </Form.Group>
        {advancedSearch && 
        <> 
          <Form.Group>
            <Form.Label>Adoption Status</Form.Label>
            <Form.Select defaultValue={0} onChange={handleChange} name='adoptionStatus'>
              <option value={0} disabled={true}>Select...</option>  
              <option value={"Available"}>Available</option>
              <option value={"Fostered"}>Fostered</option>
              <option value={"Adopted"}>Adopted</option>
            </Form.Select>
          </Form.Group>
            <Form.Group>
            <Form.Label>Height</Form.Label>
          <Form.Control type='text' onChange={handleChange} name='height'></Form.Control>
          </Form.Group>      
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control type='text' onChange={handleChange} name='weight'></Form.Control>
          </Form.Group>  
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' onChange={handleChange} name='name'></Form.Control>
          </Form.Group>    
        </>}
        {searched && <Button type='reset' onClick={handleClear} className="mt-2" >Clear Search</Button>}
        {!searched && <Button type='submit' className="mt-2">Search</Button>}
      </Form>
    </div>
  )
}

export default SearchBar



// Advanced search:
// Can search based on , Height, Weight, Type, Name
