import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios';
import { Link, useNavigate }  from 'react-router-dom'

function SearchBar({setSearchClicked}) {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchObject, setSearchObject] = useState({});
  const {currentUser, serverUrl} = useAuth();
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchObject({...searchObject,  [e.target.name]: e.target.value})
  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(searchObject);
    navigate(`/search?${queryParams.toString()}`);
    setSearchClicked(false)
  }

  const formGroupClassList = 'd-flex align-items-baseline my-2'
  const formLabelClassList = 'me-2 text-nowrap'

  return (
    <div>
      <Form onSubmit={handleSearch} className='d-flex flex-column'>
        <h1>Search your Pet</h1>
        <Form.Check className='align-self-center' type='switch' id= 'basic-advanced-search' label='Advanced Search' onChange={() => setAdvancedSearch(!advancedSearch)} />
        <Form.Group className={formGroupClassList}>
          <Form.Label className={formLabelClassList}>Type</Form.Label>
          <Form.Select defaultValue={0} onChange={handleChange} disabled={searched} name='type'>
            <option value={0} disabled>Select...</option>
            <option value={"Dog"} >Dog</option>
            <option value={"Cat"} >Cat</option>
          </Form.Select>
        </Form.Group>
        {advancedSearch && 
        <> 
          <Form.Group className={formGroupClassList}>
            <Form.Label className={formLabelClassList}>Adoption Status</Form.Label>
            <Form.Select defaultValue={0} onChange={handleChange} disabled={searched} name='adoptionStatus'>
              <option value={0} disabled={true}>Select...</option>  
              <option value={"Available"}>Available</option>
              <option value={"Fostered"}>Fostered</option>
              <option value={"Adopted"}>Adopted</option>
            </Form.Select>
          </Form.Group>
            <Form.Group className={formGroupClassList}>
            <Form.Label className={formLabelClassList}>Height</Form.Label>
          <Form.Control type='text' onChange={handleChange} name='height' disabled={searched}></Form.Control>
          </Form.Group>      
          <Form.Group className={formGroupClassList}>
            <Form.Label className={formLabelClassList}>Weight</Form.Label>
            <Form.Control type='text' onChange={handleChange} name='weight' disabled={searched}></Form.Control>
          </Form.Group>  
          <Form.Group className={formGroupClassList}>
            <Form.Label className={formLabelClassList}>Name</Form.Label>
            <Form.Control type='text' onChange={handleChange} name='name' disabled={searched}></Form.Control>
          </Form.Group>    
        </>}
        <Button type='submit' className="mt-2" variant='info'>Search</Button>
      </Form>
    </div>
  )
}

export default SearchBar

