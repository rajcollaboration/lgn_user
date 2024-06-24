import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import "./Login.css";
import Header from '../Header/Header';

const Login = ({ onLoginSuccess }) => { // Pass onLoginSuccess as a prop
  const log_api = `${process.env.REACT_APP_LOCAL_BASE_URL}/api/auth/login`;    
  const navigate = useNavigate();
  const [inputState, setInput] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...inputState, [name]: value });
  };

  const { mutate } = useMutation(
    (payload) => axios.post(log_api, payload),
    {
      onSuccess: (res) => {
        if (res.data.status === "1") {
          alert(res.data.message);
          const { token , user} = res.data;
          onLoginSuccess(); // Call onLoginSuccess after successful login
          localStorage.setItem("user_details",JSON.stringify({token, user}));
          navigate(<Header/>);
        } else {
          alert(res.data.message);
        }
      },
      onError: (error) => {
        if (error.response && error.response.status === 401) {
          alert('Login failed: Incorrect email or password.');
        } else {
          console.error('Error logging in:', error);
          toast.error('Error during login. Please try again.');
        }
      },
    }
  );

  const submitHandler = (event) => {
    event.preventDefault();

    // Email validation
    if (!inputState.email || !/\S+@\S+\.\S+/.test(inputState.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    // Password validation
    if (!inputState.password) {
      alert('Please enter a password');
      return;
    }

    mutate({
      userName: inputState.email,
      password: inputState.password,
    });
  };

  return (
    <section className='section-wrap'>
      <div className='login_box'>
        <figure className='log-img'>
          <img src={require('./lgn_logo.png')} alt="Logo" className="login-logo" />
        </figure>
        <form className='log-add-form' onSubmit={submitHandler}>
          <div className='login-fields mb-16'>
            <label className='control-label'>Email </label>
            <input
              className='form-control'
              type='email'
              name='email'
              value={inputState.email}
              onChange={changeHandler}
              autoComplete='off'
            />
          </div>
          <div className='login-fields mb-16'>
            <label className='control-label'>Password </label>
            <input
              className='form-control'
              type='password'
              name='password'
              value={inputState.password}
              onChange={changeHandler}
              autoComplete='off'
            />
          </div>
          <p className='log-forgot-pss text-end'>
            <p>Forgot Password?</p>
          </p>
          <div className='login-fields'>
            <input className='submit_btn' type='submit' value='Login' />
          </div>
          <br/>
          <div className='login-fields text-center'>
            Don't have an account? <a className='register-submit-btn' href='/reg'>Register</a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
