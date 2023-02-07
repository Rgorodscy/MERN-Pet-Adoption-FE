import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Login from "./Login";
import SignUp from "./SignUp";

function LoginSignUpModal() {
  const [signup, setSignup] = useState(false);

  return (
    <div className="d-flex flex-column align-items-center modal-style">
      <div className="toggle-container-style">
        <Button className="w-50 toggle-style" disabled={!signup} onClick={() => setSignup(!signup)}>Login</Button>
        <Button className="w-50 toggle-style" disabled={signup} onClick={() => setSignup(!signup)}>Signup</Button>
      </div>
      {!signup && <Login />}
      {signup && <SignUp setSignup={setSignup} />}
    </div>
  );
}

export default LoginSignUpModal;
