import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const reg_api = `${process.env.REACT_APP_LOCAL_BASE_URL}/api/auth/register`;
    const navigate = useNavigate();

    const [inputState, setInput] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setInput({ ...inputState, [name]: value });
    };

    const { mutate } = useMutation(
        (payload) => axios.post(reg_api, payload),
        {
            onSuccess: (res) => {
                if (res.data.status === "1") {
                    toast.success(res.data.message);
                    navigate("/");
                } else {
                    toast.error(res.data.message);
                }
            },
            onError: (error) => {
                console.error('Error during registration:', error);
                toast.error('Error during registration. Please try again.');
            },
        }
    );

    const submitHandler = (event) => {
        event.preventDefault();

        // Name validation
        if (!inputState.name) {
            toast.error('Please enter a valid name.');
            return;
        }

        // Email validation
        if (!inputState.email || !/\S+@\S+\.\S+/.test(inputState.email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        // Password validation
        if (!inputState.password) {
            toast.error('Please enter a password');
            return;
        }

        mutate(inputState);
    };

    return (
        <div className='section-wrap'>
            <div className='reg-box'>
                <figure className='reg-img'>
                    <img src={require('./lgn_logo.png')} alt="Logo" className="reg-logo" />
                </figure>
                <form className='reg-form' onSubmit={submitHandler}>
                    <div className='reg-fields mb-16'>
                        <label className='control-label'>Name</label>
                        <input
                            className='form-control'
                            type='text'
                            name='name'
                            value={inputState.name}
                            onChange={changeHandler}
                        />
                    </div>

                    {/* Mobile Number field */}
                    <div className='reg-fields mb-16'>
                        <label className='control-label'>Mobile No</label>
                        <input
                            className='form-control'
                            type='number'
                            name='mobile'
                            value={inputState.mobile}
                            onChange={changeHandler}
                        />
                    </div>

                    {/* Email field */}
                    <div className='reg-fields mb-16'>
                        <label className='control-label'>Email</label>
                        <input
                            className='form-control'
                            type='email'
                            name='email'
                            value={inputState.email}
                            onChange={changeHandler}
                        />
                    </div>

                    {/* Password field */}
                    <div className='reg-fields mb-16'>
                        <label className='control-label'>Password</label>
                        <input
                            className='form-control'
                            type='password'
                            name='password'
                            value={inputState.password}
                            onChange={changeHandler}
                        />
                    </div>

                    {/* Submit button */}
                    <input className='reg-add-register' type='submit' value='Register' />
                </form>
            </div>
        </div>
    );
};

export default Register;
