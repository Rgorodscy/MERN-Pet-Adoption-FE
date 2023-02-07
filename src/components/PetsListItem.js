import React from "react";
import { Link } from "react-router-dom";

function PetsListItem({ pet }) {
  const petPageLink = `/petedit/:${pet.id}`;

  return (
    <Link
      to={petPageLink}
      className="
    border-bottom border-secondary rounded 
    d-block text-decoration-none 
    py-1 my-1
    text-capitalize
    button-style"
    >
      {pet.name}
    </Link>
  );
}

export default PetsListItem;
