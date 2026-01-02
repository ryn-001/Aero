import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { config } from '../../config';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const {login} = useAuth();

    const [data, setData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errorData, setError] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        let temp = {};

        if (!data.email.trim()) temp.email = 'Email required';
        else if (!/\S+@\S+\.\S+/.test(data.email)) temp.email = 'Enter valid Email ID';

        if (!data.password) temp.password = 'Password required';
        else if (data.password.length < 6) temp.password = 'Password must be at least 6 characters';
        else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(data.password)) temp.password = 'Password should contain at least one symbol';
        else if (!/[0-9]/.test(data.password)) temp.password = 'Password should contain at least one number';
        else if (!/[a-zA-Z]+/.test(data.password)) temp.password = 'Password should contain at least one letter';

        setError(temp);
        return Object.keys(temp).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const loginData = axios.post(
                `${config.endpoint}/users/login`,
                { email: data.email, password: data.password },
                { withCredentials: true }
            );

            toast.promise(
                loginData, 
                {
                    loading: 'Checking...',
                    success: <b>Logged In !</b>,
                    error: <b>Unable to Login</b>,
                },
                {
                    success: {
                        duration: 2000,
                    },
                    error: {
                        duration: 3000,
                    },
                }
            );

            const res = await loginData;
            if (res.status === 200) {
                login(res.data.user);
                navigate('/tripForm')
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    const textFieldStyles = {
        '& .MuiInput-underline:before': { borderBottomColor: '#888' },
        '& .MuiInput-underline:hover:before': { borderBottomColor: '#555' },
        '& .MuiInput-underline:after': { borderBottomColor: '#FF8C00', borderBottomWidth: 2 },
        '& .MuiInputLabel-root': { color: '#888' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#FF8C00' },
        '& .Mui-error:after': { borderBottomColor: '#d32f2f' },
        '& .Mui-error': { color: '#d32f2f' },
        '& .MuiFormHelperText-root.Mui-error': { color: '#d32f2f', fontSize: '12px', marginLeft: 0 },
    };

    return (
        <div className='login'>
            

            <h1>Login</h1>
            <form className='login-form' onSubmit={handleSubmit} noValidate>
                <TextField
                    type="email"
                    name="email"
                    label="Email"
                    variant='standard'
                    value={data.email}
                    onChange={handleChange}
                    sx={textFieldStyles}
                    error={!!errorData.email}
                    helperText={errorData.email}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    variant='standard'
                    value={data.password}
                    onChange={handleChange}
                    sx={textFieldStyles}
                    error={!!errorData.password}
                    helperText={errorData.password}
                    fullWidth
                    margin="normal"
                />
                <div className="login-utils">
                    <div id="remember-me">
                        <input
                            type="checkbox"
                            id="remember-me-checkbox"
                            name="rememberMe"
                            checked={data.rememberMe}
                            onChange={handleChange}
                            style={{ width: "18px" }}
                        />
                        <label
                            htmlFor="remember-me-checkbox"
                            style={{ fontSize: "14px", color: "#555", cursor: "pointer", userSelect: "none", marginLeft: "6px" }}
                        >
                            Remember me
                        </label>
                    </div>
                    <div
                        onClick={() => navigate('/register')}
                        style={{ color: '#FF8C00', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}
                    >
                        Register Here
                    </div>
                </div>
                <Button
                    id="form-submit-button"
                    type='submit'
                    disabled={!data.email.trim() || !data.password.trim()}
                    variant='contained'
                    sx={{ backgroundColor: "black", marginTop: 2 }}
                    fullWidth
                >
                    LOGIN
                </Button>
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'small',
                        color: 'black',
                        opacity: '0.75',
                        margin: '15px 0'
                    }}
                >
                    <hr style={{ width: '100%', marginRight: '0.5rem' }} /> OR <hr style={{ width: '100%', marginLeft: '0.5rem' }} />
                </span>
                <Button
                    type='button'
                    variant='outlined'
                    sx={{ border: '1px solid black', width: '100%', color: 'black' }}
                >
                    <FaGoogle style={{ marginRight: '10px' }} />
                    Continue with Google
                </Button>
            </form>
        </div>
    );
}
