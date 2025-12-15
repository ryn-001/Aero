import { useState } from 'react'
import { TextField, Button } from '@mui/material';
import { FaGoogle } from "react-icons/fa";
import './Register.css'

export default function Register() {
    const [data, setData] = useState({
        username: '',
        userid: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
    })

    const handleSumbit = async (e) => {
        e.preventDefault();
        console.log(data);
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
    }

    return (
        <div className='register'>
            <h1>Sign Up</h1>

            <form onSubmit={handleSumbit}>
                <TextField
                    className='form'
                    type="text"
                    name="username"
                    label="Fullname"
                    id="username"
                    variant='standard'
                    value={data.username}
                    onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    sx={textFieldStyles}
                />

                <TextField
                    type="text"
                    name="userid"
                    label="Username"
                    id="userid"
                    variant='standard'
                    value={data.userid}
                    onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    sx={textFieldStyles}
                />

                <TextField
                    type="email"
                    name="email"
                    label="Email"
                    id="email"
                    variant='standard'
                    value={data.email}
                    onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    sx={textFieldStyles}
                />

                <TextField
                    type="password"
                    name="password"
                    label="Create your password"
                    id="password"
                    variant='standard'
                    value={data.password}
                    onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    sx={textFieldStyles}
                />

                <TextField
                    type="password"
                    name="confirmPassword"
                    label="Confirm your password"
                    id="confirm-password"
                    variant='standard'
                    value={data.confirmPassword}
                    onChange={(e) => setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                    sx={textFieldStyles}
                />

                <Button id="form-submit-button" type='submit' variant='contained' sx={{ backgroundColor: "black" }}>
                    SIGN UP
                </Button>

                <div id="remember-me">
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
                    <Button id="google-oauth" type='submit' variant='outlined'
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
