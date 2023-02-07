import React, { useEffect, useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import PetCard from "../components/PetCard";

function MyPets() {
  const { currentUser } = useAuth();
  const [userPetsList, setUserPetsList] = useState(currentUser.myPets);
  const [savedPets, setSavedPets] = useState(false);

  useEffect(() => {
    if (!savedPets) {
      setUserPetsList(currentUser.myPets);
    }
    if (savedPets) {
      setUserPetsList(currentUser.savedPets);
    }
  }, [savedPets]);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="my-3">
        <h1>My Pets</h1>
      </div>
      <div className="toggle-container-style d-flex w-50 mb-3">
        <Button className="w-50 toggle-style text-nowrap" disabled={!savedPets} onClick={() => setSavedPets(!savedPets)}>My Pets</Button>
        <Button className="w-50 toggle-style text-nowrap" disabled={savedPets} onClick={() => setSavedPets(!savedPets)}>Saved Pets</Button>
      </div>
      {!userPetsList[0] && !savedPets ? (
        <h2>You currently do not own or foster any pets</h2>
      ) : (
        ""
      )}
      {!userPetsList[0] && savedPets ? (
        <h2>You currently do not have any pets saved</h2>
      ) : (
        ""
      )}
      {userPetsList.map((pet) => (
        <Col xs={6} sm={4} md={3} className="m-2">
          <PetCard key={pet.id} pet={pet} />
        </Col>
      ))}
    </div>
  );
}

export default MyPets;
