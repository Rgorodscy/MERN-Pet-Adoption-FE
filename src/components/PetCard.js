import React from "react";
import { Card, Image, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function PetCard({ pet }) {
  const petPageLink = `/pet/:${pet.id}`;

  let adoptionStatusAlertColor;
  if (pet.adoptionStatus === "Available") {
    adoptionStatusAlertColor = "info";
  } else if (pet.adoptionStatus === "Fostered") {
    adoptionStatusAlertColor = "primary";
  } else {
    adoptionStatusAlertColor = "secondary";
  }

  const onImageError = (e) => {
    e.target.src =
      "https://res.cloudinary.com/dyur3xjlc/image/upload/v1674034722/pet_image_placeholder_id1nvf.jpg";
  };

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-info text-light">
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
        <Alert className="mt-3" variant={adoptionStatusAlertColor}>
          {pet.adoptionStatus}
        </Alert>
        <Link to={petPageLink} className="btn btn-info">
          See More
        </Link>
      </Card.Body>
    </Card>
  );
}

export default PetCard;
