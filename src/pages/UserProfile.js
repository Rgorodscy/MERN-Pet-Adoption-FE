import React, { useState, useEffect } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import PetCard from "../components/PetCard";

function UserProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const {
    serverUrl,
    currentUser,
    token,
    setToastMessage,
    setShowNotificationToast,
  } = useAuth();
  const userId = id ? id.slice(1) : currentUser.id;
  const isCurrentUserProfile = id ? false : true;

  useEffect(() => {
    initialFetch();
  }, [id]);

  const initialFetch = async () => {
    try {
      const userFound = await axios.get(`${serverUrl}/user/${userId}`, {
        headers: { withCredentials: true },
      });
      setUserData(userFound.data);
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

  const handleAdmin = async () => {
    try {
      const newUserInfo = {
        ...userData,
        isAdmin: true,
      };
      const updatedUser = await axios.put(
        `${serverUrl}/user/${userId}`,
        newUserInfo,
        { headers: { authorization: `Bearer ${token}`, withCredentials: true } }
      );
      if (updatedUser) {
        setUserData({ ...userData, isAdmin: true });
        setToastMessage({
          variant: "Info",
          messageType: "Success",
          message: "User is now an admin.",
        });
        setShowNotificationToast(true);
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
  };

  const divClassList = "d-flex";
  const labelClassList = "me-2 text-capitalize";

  return (
    <div>
      {!userData.id && <Spinner className="text-secondary mt-3" />}
      {userData.id && (
        <div className="d-flex flex-column align-items-center text-secondary mt-3">
          {currentUser.isAdmin && !userData.isAdmin && (
            <Button onClick={handleAdmin} variant="info">
              Make Admin
            </Button>
          )}
          {!isCurrentUserProfile && (
            <h1>
              {userData.firstName} {userData.lastName}'s Profile
            </h1>
          )}
          {isCurrentUserProfile && <h1>Your Profile</h1>}
          <div>
            <Card className="mb-3 shadow-sm">
              <Card.Header className="bg-info text-light">
                <h2 className="text-capitalize">
                  {userData.firstName} {userData.lastName}
                </h2>
              </Card.Header>
              <Card.Body>
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
              </Card.Body>
              {userData.id === currentUser.id && (
                <Card.Footer className="bg-info text-light">
                  <Button
                    onClick={() => navigate("/editprofile")}
                    variant="light"
                  >
                    Edit Profile
                  </Button>
                </Card.Footer>
              )}
            </Card>
          </div>
          <div className="d-flex">
            {userData.myPets && (
              <Card className="me-3 p-2">
                <div className="d-flex flex-column">
                  <h2 className={labelClassList}>
                    {userData.firstName}'s pets:
                  </h2>
                  {userData.myPets.map((pet) => (
                    <div className="m-2">
                      <PetCard key={pet.id} pet={pet} className="col-xs-3" />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {userData.savedPets && (
              <Card className="ms-3 p-2">
                <div className="d-flex flex-column">
                  <h2 className={labelClassList}>Saved pets:</h2>
                  {userData.savedPets.map((pet) => (
                    <div className="m-2">
                      <PetCard key={pet.id} pet={pet} className="col-xs-3" />
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
