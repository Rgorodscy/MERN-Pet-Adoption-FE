import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Signup({ setSignup }) {
  const { serverUrl, setToastMessage, setShowNotificationToast } = useAuth();
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    postUser(newUser);
  };

  const postUser = async (newUser) => {
    try {
      const res = await axios.post(`${serverUrl}/signup/`, newUser, {
        headers: { withCredentials: true },
      });
      if (res) {
        navigate("/");
        setSignup(false);
        setToastMessage({
          variant: "Info",
          messageType: "Sucess",
          message: "User created sucessfully!",
        });
        setShowNotificationToast(true);
      }
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
    <div className="d-flex flex-column align-items-center p-3">
      <h1>Sign Up</h1>
      <Form onSubmit={handleSignUp} noValidate validated={validated}>
        <Form.Group className="mt-3">
          <FloatingLabel label="Email">
            <Form.Control
              type="email"
              onChange={handleChange}
              name="email"
              required
              placeholder="Email"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mt-3">
          <FloatingLabel label="Password">
            <Form.Control
              type="password"
              onChange={handleChange}
              name="password"
              required={true}
              placeholder="Password"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose a password
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mt-3">
          <FloatingLabel label="Confirm Password">
            <Form.Control
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              required={true}
              placeholder="Confirm Password"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please confirm your password
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mt-3">
          <FloatingLabel label="First Name">
            <Form.Control
              type="text"
              onChange={handleChange}
              name="firstName"
              required={true}
              placeholder="First Name"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please provide your First Name
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mt-3">
          <FloatingLabel label="Last Name">
            <Form.Control
              type="text"
              onChange={handleChange}
              name="lastName"
              required={true}
              placeholder="Last Name"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please provide your Last Name
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mt-3">
          <FloatingLabel label="Phone Number">
            <Form.Control
              type="tel"
              onChange={handleChange}
              name="phone"
              required={true}
              placeholder="Phone Number"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please provide your Phone Number
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>

        <Button className="w-100 mt-3" type="submit" variant="info">
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
