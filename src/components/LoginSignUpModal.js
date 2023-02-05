import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Login from "./Login";
import SignUp from "./SignUp";
import { modalBgColor } from "./libs";

function LoginSignUpModal() {
  const [signup, setSignup] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center" style={modalBgColor}>
      <Form.Check
        type="switch"
        id="login-signup"
        label="I'm a New User"
        onChange={() => setSignup(!signup)}
        value={signup}
        variant="info"
      />
      {!signup && <Login />}
      {signup && <SignUp setSignup={setSignup} />}
    </div>
  );
}

export default LoginSignUpModal;
