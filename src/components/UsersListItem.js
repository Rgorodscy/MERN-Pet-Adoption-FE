import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

function UsersListItem({ user }) {
  const userPageLink = `/profile/:${user.id}`;

  return (
    <Link
      to={userPageLink}
      className=" 
      border-bottom border-secondary rounded 
      d-flex text-decoration-none 
      py-1 my-1
      button-style
      justify-content-between

      "
    >
      <Col xs={5} sm={4} md={3}>
        <span className="pet-user-name text-capitalize">
          {user.firstName} {user.lastName}
        </span>
      </Col>
      <Col xs={7} sm={6} md={4}>
        <div className="d-flex flex-column text-break">
          <span>Email: {user.email}</span>
          <span>Phone: {user.phone}</span>
        </div>
      </Col>
    </Link>
  );
}

export default UsersListItem;
