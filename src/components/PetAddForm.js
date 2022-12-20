import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function PetAddForm() {
  return (
    <div className='d-flex flex-column align-items-center'>
    <h1>Add a new pet</h1>
    <Form className='w-50'>
      <Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Select defaultValue={0}>
          <option value={0} disabled={true}>Select...</option>  
          <option value={"dog"}>Dog</option>
          <option value={"cat"}>Cat</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text'></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Adoption Status</Form.Label>
        <Form.Select defaultValue={0}>
          <option value={0} disabled={true}>Select...</option>  
          <option value={"available"}>Available</option>
          <option value={"fostered"}>Fostered</option>
          <option value={"adopted"}>Adopted</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Image</Form.Label>
        <Form.Control type='file'></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Height</Form.Label>
        <Form.Control type='text'></Form.Control>
      </Form.Group>      
      <Form.Group>
        <Form.Label>Weight</Form.Label>
        <Form.Control type='text'></Form.Control>
      </Form.Group>      
      <Form.Group>
        <Form.Label>Color</Form.Label>
        <Form.Control type='text'></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control type='text'></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Hypoallergenic</Form.Label>
        <Form.Select defaultValue={0}>
          <option value={0} disabled={true}>Select...</option>  
          <option value={"yes"}>Yes</option>
          <option value={"no"}>No</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Dietary Restrictions</Form.Label>
        <Form.Control type='text'></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Breed</Form.Label>
        <Form.Control type='text'></Form.Control>
      </Form.Group>
      <Button>Add Pet</Button>
    </Form>
    </div>
  )
}

export default PetAddForm