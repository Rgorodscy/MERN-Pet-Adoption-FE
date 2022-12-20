import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

function SearchBar() {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [type, setType] = useState('');
  const [adoptionStatus, setAdoptionStatus] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [name, setName] = useState('');



  const handleSearch = (e) => {
    e.preventDefault();

    //Send request to the server with the values from the search
  }

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Form.Check type='switch' id='basic-advanced-search' label='Advanced Search' onChange={() => setAdvancedSearch(!advancedSearch)} />
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Select defaultValue={0} onChange={(e) => setType(e.target.value)}>
            <option value={0} disabled>Select...</option>
            <option value={"dog"} >Dog</option>
            <option value={"cat"} >Cat</option>
          </Form.Select>
        </Form.Group>
        {advancedSearch && 
        <> 
          <Form.Group>
            <Form.Label>Adoption Status</Form.Label>
            <Form.Select defaultValue={0} onChange={(e) => setAdoptionStatus(e.target.value)}>
              <option value={0} disabled={true}>Select...</option>  
              <option value={"available"}>Available</option>
              <option value={"fostered"}>Fostered</option>
              <option value={"adopted"}>Adopted</option>
            </Form.Select>
          </Form.Group>
            <Form.Group>
            <Form.Label>Height</Form.Label>
          <Form.Control type='text' onChange={(e) => setHeight(e.target.value)}></Form.Control>
          </Form.Group>      
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control type='text' onChange={(e) => setWeight(e.target.value)}></Form.Control>
          </Form.Group>  
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>    
        </>}
        <Button type='submit'>Search</Button>
      </Form>
    </div>
  )
}

export default SearchBar



// Advanced search:
// Can search based on , Height, Weight, Type, Name
