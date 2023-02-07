import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const {
    setCurrentUser,
    serverUrl,
    setShowLoginModal,
    setToken,
    setToastMessage,
    setShowNotificationToast,
  } = useAuth();
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    postUser(user);
  };

  const postUser = async (user) => {
    try {
      const res = await axios.post(`${serverUrl}/login/`, user, {
        headers: { withCredentials: true },
      });
      setCurrentUser(JSON.parse(res.data.userData));
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.userData);
      setShowLoginModal(false);
      navigate("/mypets");
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
      <h1>Login</h1>
      <Form onSubmit={handleLogin} noValidate validated={validated}>
        <Form.Group className="mt-3">
          <FloatingLabel label="Email">
            <Form.Control
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="Email"
              required
              className="input-group"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please insert your email
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mt-3">
          <FloatingLabel label="Password">
            <Form.Control
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Password"
              required
              className="input-group"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Please insert your password
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Button className="w-100 mt-3 button-style" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
