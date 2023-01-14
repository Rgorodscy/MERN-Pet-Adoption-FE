import React from "react";
import { Link } from "react-router-dom";

function UsersListItem({ user }) {
  const userPageLink = `/profile/:${user.id}`;

  return (
    <Link
      to={userPageLink}
      className="
    bg-info 
    text-light  
    border-bottom border-secondary rounded 
    d-block text-decoration-none 
    py-1 my-1
    text-capitalize"
    >
      {user.firstName} {user.lastName}
    </Link>
  );
}

export default UsersListItem;
