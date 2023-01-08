import React, {useState} from 'react'
import {Form} from 'react-bootstrap'
import Login from './Login'
import SignUp from './SignUp'


function LoginSignUpModal() {
  const [signup, setSignup] = useState(false);

  return (
    <div className='d-flex flex-column align-items-center'>
      <Form.Check type='switch' id='login-signup' label="I'm a New User" onChange={() => setSignup(!signup)} value={signup} />
      {!signup && <Login />}
      {signup && <SignUp setSignup={setSignup} />}
    </div>
  )
}

export default LoginSignUpModal