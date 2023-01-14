import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const navigate = useNavigate();
  const {
    currentUser,
    setCurrentUser,
    serverUrl,
    token,
    setShowNotificationToast,
    setToastMessage,
  } = useAuth();
  const [newUserInfo, setNewUserInfo] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phone: currentUser.phone,
    password: currentUser.password,
    confirmPassword: currentUser.confirmPassword,
    id: currentUser.id,
    bio: "",
  });

  const handleChange = (e) => {
    setNewUserInfo({ ...newUserInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await axios.put(
      `${serverUrl}/user/${currentUser.id}`,
      newUserInfo,
      { headers: { authorization: `Bearer ${token}`, withCredentials: true } }
    );
    if (updatedUser) {
      setCurrentUser({ ...currentUser, ...newUserInfo });
      setToastMessage({
        variant: "Info",
        messageType: "Success",
        message: "Profile updated successfully!",
      });
      setShowNotificationToast(true);
    }
    navigate("/myprofile");
  };

  const formGroupClassList = "mt-3";

  return (
    <div className="d-flex flex-column align-items-center text-secondary mt-3">
      <h1>Update Your Profile</h1>
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group className={formGroupClassList}>
          <FloatingLabel label="First Name">
            <Form.Control
              type="text"
              defaultValue={currentUser.firstName}
              name="firstName"
              onChange={handleChange}
              placeholder="First Name"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className={formGroupClassList}>
          <FloatingLabel label="Last Name">
            <Form.Control
              type="text"
              defaultValue={currentUser.lastName}
              name="lastName"
              onChange={handleChange}
              placeholder="Last Name"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className={formGroupClassList}>
          <FloatingLabel label="Email">
            <Form.Control
              type="email"
              defaultValue={currentUser.email}
              name="email"
              onChange={handleChange}
              placeholder="Email"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className={formGroupClassList}>
          <FloatingLabel label="Phone Number">
            <Form.Control
              type="tel"
              defaultValue={currentUser.phone}
              name="phone"
              onChange={handleChange}
              placeholder="Phone Number"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className={formGroupClassList}>
          <FloatingLabel label="Password">
            <Form.Control
              type="password"
              defaultValue={currentUser.password}
              name="password"
              onChange={handleChange}
              placeholder="Password"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className={formGroupClassList}>
          <FloatingLabel label="Confirm Password">
            <Form.Control
              type="password"
              defaultValue={currentUser.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm Password"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className={formGroupClassList}>
          <FloatingLabel label="Bio">
            <Form.Control
              as="textarea"
              defaultValue={currentUser.bio ? currentUser.bio : ""}
              name="bio"
              onChange={handleChange}
              placeholder="Bio"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Button type="submit" variant="info" className="mt-2">
          Update Profile
        </Button>
      </Form>
    </div>
  );
}

export default ProfileForm;
