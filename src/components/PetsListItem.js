import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function PetsListItem({ pet }) {
  const petPageLink = `/petedit/:${pet.id}`;

  return (
    <Link
      to={petPageLink}
      className="
    border-bottom border-secondary rounded 
    d-flex text-decoration-none 
    py-1 my-1
    button-style
    justify-content-between
    text-break"
    >
      <Col xs={3}>
        <span className="pet-user-name text-capitalize">{pet.name}:</span>
      </Col>

      <Col xs={2}>Status: {pet.adoptionStatus}</Col>
      <Col xs={2}>Type: {pet.type}</Col>
      <Col xs={2}>Breed: {pet.breed}</Col>
    </Link>
  );
}

export default PetsListItem;
