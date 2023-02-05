import React from "react";
import { Link } from "react-router-dom";
import { buttonStyle } from "./libs";

function UsersListItem({ user }) {
  const userPageLink = `/profile/:${user.id}`;

  return (
    <Link
      to={userPageLink}
      className=" 
    border-bottom border-secondary rounded 
    d-block text-decoration-none 
    py-1 my-1
    text-capitalize"
      style={buttonStyle}
    >
      {user.firstName} {user.lastName}
    </Link>
  );
}

export default UsersListItem;
