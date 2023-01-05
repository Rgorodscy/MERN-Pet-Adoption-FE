import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import PetCard from '../components/PetCard'

function UserProfile() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [userData, setUserData] = useState([]);
    const {serverUrl, currentUser, token} = useAuth();
    const userId = id ? id.slice(1) : currentUser.id;
    const isCurrentUserProfile = id ? false : true;
    
    useEffect(() => {
        initialFetch();
      }, [id]);
    
      const initialFetch = async () => {
        try{
          const userFound = await axios.get(`${serverUrl}/user/${userId}`);
          setUserData(userFound.data);
        }catch(err){
          console.log(err)
        }
      }

      const handleAdmin = async () => {
        try{
          const newUserInfo = {
            ...userData,
            isAdmin: true
          }
          const updatedUser = await axios.put(`${serverUrl}/user/${userId}`, newUserInfo, {headers: {authorization: `Bearer ${token}`}});
          if(updatedUser){
            alert("User Updated");
            setUserData({...userData, isAdmin: true})
          }
          
        }catch(err){
          console.log(err)
        }
      }

      const divClassList = 'd-flex';
      const labelClassList = 'me-2';

    return (
    
    <div>
        <div className='d-flex flex-column align-items-center text-secondary mt-3'>
        {currentUser.isAdmin && !userData.isAdmin &&
        <Button onClick={handleAdmin} variant='info'>Make Admin</Button>
        }
        {!isCurrentUserProfile &&
        <h1>{userData.firstName} {userData.lastName}'s Profile</h1>
        }
        {isCurrentUserProfile &&
        <div>
          <h1>Your Profile</h1>
          <Button onClick={() => navigate('/editprofile')} variant='info'>Edit Profile</Button>
          <div className={divClassList}>
            <h2 className={labelClassList}>Full Name:</h2>
            <h3>{userData.firstName} {userData.lastName}</h3>
          </div>
        </div>
        }
        <div className={divClassList}>
            <h2 className={labelClassList}>Email:</h2>
            <h3>{userData.email}</h3>
        </div>
        <div className={divClassList}>
            <h2 className={labelClassList}>Phone Number:</h2>
            <h3>{userData.phone}</h3>
        </div>
        <div className={divClassList}>
            <h2 className={labelClassList}>Bio:</h2>
            <h3>{userData.bio}</h3>
        </div>
        <div>
          {userData.myPets &&
          <div className='d-flex flex-column'>
          <h2 className={labelClassList}>{userData.firstName}'s pets:</h2>
              {userData.myPets.map(pet => 
                  <div className='m-2'>
                  <PetCard key={pet.id} pet={pet} className="col-xs-3"/>
                  </div>
              )}
          
          </div>
          }
          
          {userData.savedPets &&
          <div className='d-flex flex-column'>
              <h2 className={labelClassList}>{userData.firstName}'s saved pets:</h2>
              {userData.savedPets.map(pet => 
                  <div className='m-2'>
                  <PetCard key={pet.id} pet={pet} className="col-xs-3"/>
                  </div>
              )}             
          </div>
          }
        </div>
        </div>
    </div>
  )
}

export default UserProfile