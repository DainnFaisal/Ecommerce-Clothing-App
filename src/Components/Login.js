import React from 'react';
import { auth } from '../firebaseConfig';   
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from 'react-hook-form';
import '../StyleSheets/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const loginUser = async ( data) => {

    const { email, password } = data;
   

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in user:", user.email);
      navigate('/Products');
      
    } catch (error) {

      console.error("Error signing in:", error);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='login-form'>
          <form onSubmit={handleSubmit(loginUser)}>
            <h3 className='login-heading'>Login:</h3>
            <input
              className='input-fields'
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <br />
            {errors.email && <p className='error-text'>{errors.email.message}</p>}

            <br />
            <input
              className='input-fields'
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message: 'Password must contain at least 8 characters, including uppercase, lowercase, and numbers',
                },
              })}
            />
            <br />
            {errors.password && <p className='error-text'>{errors.password.message}</p>}

            <br />
            <button className='login-btn' type="submit">Login</button>
          </form>
        </div>
      </div>

    </>
  );
}

export default Login;                                             