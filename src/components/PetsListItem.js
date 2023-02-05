import React from "react";
import { Link } from "react-router-dom";
import { buttonStyle } from "./libs";

function PetsListItem({ pet }) {
  const petPageLink = `/petedit/:${pet.id}`;

  return (
    <Link
      to={petPageLink}
      className="
    border-bottom border-secondary rounded 
    d-block text-decoration-none 
    py-1 my-1
    text-capitalize"
      style={buttonStyle}
    >
      {pet.name}
    </Link>
  );
}

export default PetsListItem;
