import React from "react";
import UsersListContainer from "../components/UsersListContainer";
import PetsListContainer from "../components/PetsListContainer";

function Dashboard() {
  return (
    <div className="d-flex flex-column m-3">
      <h1>Dashboard</h1>
      <div className="d-flex flex-column">
        <UsersListContainer />
        <PetsListContainer />
      </div>
    </div>
  );
}

export default Dashboard;
