import React, { useState } from "react";
import UsersListContainer from "../components/UsersListContainer";
import PetsListContainer from "../components/PetsListContainer";
import { Button, Form, InputGroup } from "react-bootstrap";

function Dashboard() {
  const [showUsers, setShowUsers] = useState(false)
  
  const handleToggle = (list) => {
    if(list === 'users' && !showUsers){
      setShowUsers(true)
    }
    if(list === 'pets' && showUsers){
      setShowUsers(false)
    }
  }

  return (
    <div className="d-flex flex-column mx-3">
      <h1>Dashboard</h1>
      <div className="toggle-container-style">
        <Button className="w-50 toggle-style" disabled={!showUsers} onClick={() => handleToggle('pets')}>Pets</Button>
        <Button className="w-50 toggle-style" disabled={showUsers} onClick={() => handleToggle('users')}>Users</Button>
      </div>
      {showUsers &&
      <UsersListContainer />
      }
      {!showUsers &&
      <PetsListContainer />
      }
    </div>
  );
}

export default Dashboard;
