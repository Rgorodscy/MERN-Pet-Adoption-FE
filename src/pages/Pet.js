import React, {useContext, useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';


function Pet() {
  const {serverUrl} = useAuth();
  const { id } = useParams();
  const [petData, setPetData] = useState([])

  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    const petId = id.slice(1);
    try{
      const petFound = await axios.get(`${serverUrl}/pet/${petId}`);
      setPetData(petFound.data[0]);
    }catch(err){
      console.log(err)
    }
  }

  let adoptionStatusAlertColor;

  if(petData.adoptionStatus === "Available") {
    adoptionStatusAlertColor = 'primary'
  } else if (petData.adoptionStatus === "Fostered"){
    adoptionStatusAlertColor = 'secondary'
  } else {
    adoptionStatusAlertColor = 'success'
  }

  return (
      petData &&
      
        <Card>
          <Card.Body className='d-flex flex-column align-items-center'>
            <Image height='240px' width='240px' className='rounded' />
            <h1>{petData.name}</h1>
            <div className='w-50'>
              <p className='border border-secondary rounded'>Details:
                Height: {petData.height} <br/>
                Weight: {petData.weight} <br/>
                Color: {petData.color} <br/>
                Bio: {petData.bio} <br/>
                Hypoallergenic: {petData.hypoallergenic} <br/>
                Dietary Restrictions: {petData.dietary} <br/>
                Breed: {petData.breed} <br/>
              </p>
              <Alert variant={adoptionStatusAlertColor}>{petData.adoptionStatus}</Alert>
            </div>
            <Button disabled={petData.adoptionStatus !== "Available"}>Change Status</Button>
            <Button>Save for Later</Button>
          </Card.Body>
        </Card>
    
  )
}

export default Pet