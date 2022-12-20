import React, {useState} from 'react'
import Login from './Login'
import SignUp from './SignUp'
import Form from 'react-bootstrap/Form'


function LoginSignUpModal() {
  const [signup, setSignup] = useState(false);

  
  return (
    <div className='d-flex flex-column align-items-center'>
      <Form.Check type='switch' id='login-signup' label="I'm a New User" onChange={() => setSignup(!signup)} />
      {!signup && <Login />}
      {signup && <SignUp />}
    </div>
  )
}

export default LoginSignUpModal