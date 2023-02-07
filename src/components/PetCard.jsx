import React from "react";
import { Card, Image, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function PetCard({ pet }) {
  const petPageLink = `/pet/:${pet.id}`;

  let adoptionStatusAlertColor;
  if (pet.adoptionStatus === "Available") {
    adoptionStatusAlertColor = "available-color";
  } else if (pet.adoptionStatus === "Fostered") {
    adoptionStatusAlertColor = "fostered-color";
  } else {
    adoptionStatusAlertColor = "adopted-color";
  }

  const alertClass = `mt-3 ${adoptionStatusAlertColor}`;

  const onImageError = (e) => {
    e.target.src =
      "https://res.cloudinary.com/dyur3xjlc/image/upload/v1675608162/pet_image-removebg-preview_gq9f0q.png";
  };

  return (
    <Card className="shadow-lg rounded card-style">
      <Card.Header className="card-header-style">
        <h3 className="text-center text-capitalize">{pet.name}</h3>
      </Card.Header>
      <Card.Body>
        <Image
          src={pet.image}
          height="120px"
          width="120px"
          rounded={true}
          className="border border-secondary"
          onError={onImageError}
        />
        <Alert className={alertClass}>{pet.adoptionStatus}</Alert>
        <Link to={petPageLink} className="btn button-style">
          See More
        </Link>
      </Card.Body>
    </Card>
  );
}

export default PetCard;
