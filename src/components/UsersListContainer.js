import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import UsersListItem from "./UsersListItem";
import { Spinner } from "react-bootstrap";

function UsersListContainer() {
  const [usersList, setUsersList] = useState([]);
  const { serverUrl, token, setShowNotificationToast, setToastMessage } =
    useAuth();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const allUsers = await axios.get(`${serverUrl}/user`, {
        headers: { authorization: `Bearer ${token}`, withCredentials: true },
      });
      setUsersList(allUsers.data);
    } catch (err) {
      console.log(err);
      const errorMessage =
        typeof err.response.data === "string"
          ? err.response.data
          : err.response.statusText;
      setToastMessage({
        variant: "Danger",
        messageType: "Error",
        message: errorMessage,
      });
      setShowNotificationToast(true);
    }
  };

  return (
    <div className="w-50 ms-1">
      <h2>Users</h2>
      <div className=" vh-100 overflow-auto border rounded border-2 shadow-sm">
        {!usersList[0] && <Spinner />}
        {usersList &&
          usersList.map((user) => <UsersListItem key={user.id} user={user} />)}
      </div>
    </div>
  );
}

export default UsersListContainer;
