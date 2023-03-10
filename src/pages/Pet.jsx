import React, { useState, useEffect } from "react";
import { Card, Image, Alert, Button, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BsBookmarkHeartFill, BsBookmarkHeart } from "react-icons/bs";
import { useAuth } from "../contexts/AuthContext";

function Pet() {
  const {
    serverUrl,
    currentUser,
    setCurrentUser,
    token,
    setToastMessage,
    setShowNotificationToast,
  } = useAuth();
  const { id } = useParams();
  const [petData, setPetData] = useState({});
  const petId = id.slice(1);
  const userSavedPets = currentUser.savedPets;
  const userMyPets = currentUser.myPets;
  const petIsSaved = userSavedPets.find((pet) => pet.id === petId);
  const petIsMyPet = userMyPets.find((pet) => pet.id === petId);

  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    try {
      const petFound = await axios.get(`${serverUrl}/pet/${petId}`, {
        headers: { withCredentials: true },
      });
      setPetData(petFound.data);
    } catch (err) {
      console.log(err);
      const errorMessage =
        typeof err.response.data === "string"
          ? err.response.data
          : err.response.statusText;
      setToastMessage({
        variant: "Danger",
        messageType: "Error",
        message: errorMessage,
      });
      setShowNotificationToast(true);
    }
  };

  let adoptionStatusAlertColor;
  if (petData.adoptionStatus === "Available") {
    adoptionStatusAlertColor = "available-color";
  } else if (petData.adoptionStatus === "Fostered") {
    adoptionStatusAlertColor = "fostered-color";
  } else {
    adoptionStatusAlertColor = "adopted-color";
  }

  const alertClass = `mt-3 ${adoptionStatusAlertColor}`;

  const handleSave = async () => {
    const reqBody = {
      userId: currentUser.id,
    };
    if (!petIsSaved) {
      try {
        const saveRes = await axios.post(
          `${serverUrl}/pet/${petId}/save`,
          reqBody,
          {
            headers: {
              authorization: `Bearer ${token}`,
              withCredentials: true,
            },
          }
        );
        setCurrentUser({
          ...currentUser,
          savedPets: [...currentUser.savedPets, saveRes.data],
        });
      } catch (err) {
        console.log(err);
        const errorMessage =
          typeof err.response.data === "string"
            ? err.response.data
            : err.response.statusText;
        setToastMessage({
          variant: "Danger",
          messageType: "Error",
          message: errorMessage,
        });
        setShowNotificationToast(true);
      }
    }
    if (petIsSaved) {
      try {
        const saveRes = await axios.delete(`${serverUrl}/pet/${petId}/save`, {
          data: reqBody,
          headers: { authorization: `Bearer ${token}`, withCredentials: true },
        });
        if (saveRes) {
          const newSavedPetsArray = currentUser.savedPets.filter(
            (pet) => pet.id !== petId
          );
          setCurrentUser({ ...currentUser, savedPets: newSavedPetsArray });
        }
      } catch (err) {
        console.log(err);
        const errorMessage =
          typeof err.response.data === "string"
            ? err.response.data
            : err.response.statusText;
        setToastMessage({
          variant: "Danger",
          messageType: "Error",
          message: errorMessage,
        });
        setShowNotificationToast(true);
      }
    }
  };

  const handleAdoptFoster = async (changeType) => {
    const reqBody = {
      userId: currentUser.id,
      type: changeType,
    };
    try {
      const adoptFosterRes = await axios.post(
        `${serverUrl}/pet/${petId}/adopt`,
        reqBody,
        { headers: { authorization: `Bearer ${token}`, withCredentials: true } }
      );
      setCurrentUser({
        ...currentUser,
        myPets: [...currentUser.myPets, adoptFosterRes.data],
      });
      setPetData(adoptFosterRes.data);
    } catch (err) {
      console.log(err);
      const errorMessage =
        typeof err.response.data === "string"
          ? err.response.data
          : err.response.statusText;
      setToastMessage({
        variant: "Danger",
        messageType: "Error",
        message: errorMessage,
      });
      setShowNotificationToast(true);
    }
  };

  const handleReturn = async () => {
    const reqBody = {
      userId: currentUser.id,
    };
    try {
      const returnRes = await axios.post(
        `${serverUrl}/pet/${petId}/return`,
        reqBody,
        { headers: { authorization: `Bearer ${token}`, withCredentials: true } }
      );
      const newMyPetsArray = currentUser.myPets.filter(
        (pet) => pet.id !== petId
      );
      setCurrentUser({ ...currentUser, myPets: newMyPetsArray });
      setPetData(returnRes.data);
    } catch (err) {
      console.log(err);
      const errorMessage =
        typeof err.response.data === "string"
          ? err.response.data
          : err.response.statusText;
      setToastMessage({
        variant: "Danger",
        messageType: "Error",
        message: errorMessage,
      });
      setShowNotificationToast(true);
    }
  };

  const onImageError = (e) => {
    e.target.src =
      "https://res.cloudinary.com/dyur3xjlc/image/upload/v1674034722/pet_image_placeholder_id1nvf.jpg";
  };

  return (
    <div>
      {!petData.id && <Spinner className="mt-3" />}
      {petData.id && (
        <Card className="bg-transparent">
          <Card.Body className="d-flex flex-column align-items-center mt-3">
            <Image
              src={petData.image}
              height="240px"
              width="240px"
              className="rounded"
              onError={onImageError}
            />
            <h1>{petData.name}</h1>
            <div className="w-50">
              <p className=" rounded input-style">
                Details: <br />
                Height: {petData.height} <br />
                Weight: {petData.weight} <br />
                Color: {petData.color} <br />
                Bio: {petData.bio} <br />
                Hypoallergenic: {petData.hypoallergenic} <br />
                Dietary Restrictions: {petData.dietary} <br />
                Breed: {petData.breed} <br />
              </p>
              <Alert className={alertClass}>{petData.adoptionStatus}</Alert>
            </div>
            <div className="d-flex w-50 justify-content-around mb-3">
              {(petData.adoptionStatus === "Available" && (
                <Button
                  onClick={() => handleAdoptFoster("Adopt")}
                  className="button-style"
                >
                  Adopt
                </Button>
              )) ||
                (petIsMyPet && petData.adoptionStatus === "Fostered" && (
                  <Button
                    onClick={() => handleAdoptFoster("Adopt")}
                    className="button-style"
                  >
                    Adopt
                  </Button>
                ))}
              {petData.adoptionStatus === "Available" && (
                <Button
                  onClick={() => handleAdoptFoster("Foster")}
                  className="foster-button-style"
                >
                  Foster
                </Button>
              )}
              {petIsMyPet && (
                <Button onClick={handleReturn} className="return-button-style">
                  Return
                </Button>
              )}
              <Link onClick={handleSave} className="h4 color">
                {petIsSaved && <BsBookmarkHeartFill />}
                {!petIsSaved && <BsBookmarkHeart />}
              </Link>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default Pet;
