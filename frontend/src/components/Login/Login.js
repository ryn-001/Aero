import { useState } from 'react'
import { TextField, Button } from '@mui/material';
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import './Login.css'

export default function Login() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        userid: '',
        email: '',
        password: '',
        rememberMe: false,
    })

    const [errorData, setError] = useState({
        userid: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData(prev => ({ ...prev, [name]: value }));
        setError(prev => ({ ...prev, [name]: '' }));
    }

    const handleSumbit = async (e) => {
        e.preventDefault();

        if (!validate()) return;
    }

    const validate = () => {
        let temp = {};

        if (!data.userid.trim() && !data.email.trim()) {
            temp.userid = 'Enter the username';
            temp.email = 'Email required';
        }

        if (data.email.trim() && !/\S+@\S+\.\S+/.test(data.email)) temp.email = 'Enter valid Email ID';

        if (data.password.length < 6) temp.password = 'Password length should be greater than 6';
        else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(data.password)) temp.password = 'Password should contain atleast one symbol';
        else if (!/[0-9]/.test(data.password)) temp.password = 'Password should contain atleast one number';
        else if (!/[a-zA-Z]+/g.test(data.password)) temp.password = 'Password should contain at least one character';

        setError({
            username: '',
            email: '',
            password: '',
            ...temp,
        });


        return Object.keys(temp).length === 0;
    }

    const textFieldStyles = {
        '& .MuiInput-underline:before': {
            borderBottomColor: '#888',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#555',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FF8C00',
            borderBottomWidth: 2,
        },
        '& .MuiInputLabel-root': {
            color: '#888',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#FF8C00',
        },
        '& .Mui-error:after': {
            borderBottomColor: '#d32f2f',
        },
        '& .Mui-error': {
            color: '#d32f2f',
        },
        '& .MuiFormHelperText-root.Mui-error': {
            color: '#d32f2f',
            fontSize: '12px',
            marginLeft: 0,
        },
    }

    return (
        <div className='login'>
            <div><Toaster position="top-right" reverseOrder={true} /></div>

            <h1>Login</h1>

            <form onSubmit={handleSumbit} noValidate>

                <TextField
                    type="text"
                    name="userid"
                    label="Username"
                    id="userid"
                    variant='standard'
                    value={data.userid}
                    onChange={handleChange}
                    sx={textFieldStyles}
                    error={!!errorData.username}
                    helperText={errorData.username}
                />

                <TextField
                    type="email"
                    name="email"
                    label="Email"
                    id="email"
                    variant='standard'
                    value={data.email}
                    onChange={handleChange}
                    sx={textFieldStyles}
                    error={!!errorData.email}
                    helperText={errorData.email}
                />

                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    id="password"
                    variant='standard'
                    value={data.password}
                    onChange={handleChange}
                    sx={textFieldStyles}
                    error={!!errorData.password}
                    helperText={errorData.password}
                />


                <Button id="form-submit-button" type='submit' disabled={(!data.userid.trim() && !data.email.trim()) ||
                    !data.password.trim()} variant='contained' sx={{ backgroundColor: "black" }}>
                LOGIN
            </Button>

            <div className="login-utils">
                <div id="#remember-me">
                    <input
                        type="checkbox"
                        id="remember-me-checkbox"
                        name="rememberMe"
                        checked={data.rememberMe}
                        onChange={(e) =>
                            setData(prev => ({
                                ...prev,
                                rememberMe: e.target.checked
                            }))
                        }
                        style={{
                            width: "18px"
                        }}
                    />
                    <label
                        htmlFor="remember-me-checkbox"
                        style={{
                            fontSize: "14px",
                            color: "#555",
                            cursor: "pointer",
                            userSelect: "none",
                            marginLeft: "6px",
                        }}
                    >
                        Remember me
                    </label>
                </div>

                <div onClick={() => navigate('/register')}
                    style={{
                        color: '#FF8C00',
                        cursor: 'pointer',
                        fontSize: '14px',
                        textDecoration: 'underline'
                    }}>Register Here</div>
            </div>

            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'small',
                    color: 'black',
                    opacity: '0.75'
                }}
            ><hr style={{ width: '100%', marginRight: '0.5rem' }} /> OR <hr style={{ width: '100%', marginLeft: '0.5rem' }} /></span>

            <div className='open-authorization'>
                <Button id="google-oauth" type='button' variant='outlined'
                    sx={{
                        border: '1px solid black',
                        width: '100%',
                        color: 'black'
                    }}
                >
                    <FaGoogle style={{ marginRight: '10px' }} />
                    Continue with Google
                </Button>
            </div>

        </form >
        </div >
    )
}
