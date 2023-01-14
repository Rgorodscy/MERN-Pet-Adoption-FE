import React from "react";
import { Link } from "react-router-dom";

function PetsListItem({ pet }) {
  const petPageLink = `/petedit/:${pet.id}`;

  return (
    <Link
      to={petPageLink}
      className="
    bg-info 
    text-light 
    border-bottom border-secondary rounded 
    d-block text-decoration-none 
    py-1 my-1
    text-capitalize"
    >
      {pet.name}
    </Link>
  );
}

export default PetsListItem;
