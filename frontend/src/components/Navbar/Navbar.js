import {useAuth} from "../../contexts/AuthContext";
import { PiLeafLight } from "react-icons/pi";
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import "./Navbar.css";
import { useState, useEffect } from "react";

export default function Navbar() {

    const {user,logout} = useAuth();
    const [logoutButton,setLogoutButton] = useState(false);

    useEffect(() => {
        let timer;
        if (logoutButton) {
            timer = setTimeout(() => {
                setLogoutButton(false);
            }, 8000);
        }

        return () => clearTimeout(timer);
    }, [logoutButton]);

    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            <div className='nav-logo' onClick={() => navigate('/')}>
                <PiLeafLight />Aero
            </div>

            <div className='nav-content' style={{
                width: logoutButton ? "320px" : "150px",
                transition: "width 0.3s ease-in-out",
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
                alignItems: "center"
            }}>
                {user ? (<div style={{display: "flex", alignItems:"center", justifyContent:"flex-end", gap:"1rem"}}>
                    <Button
                    disableRipple
                    sx={{
                        width: '120px',
                        height: '40px',
                        borderRadius: '1rem',
                        color: 'black',
                        border: '2px solid lightgrey',

                        '&:hover': {
                            backgroundColor: '#FF8C00',
                            border: '2px solid #FF8C00',
                            boxShadow: 'none',
                        },
                    }}
                    onClick={() => navigate('/alltrips')}
                    variant='text'>My Trips</Button>

                    <div className="user-profile" style={{cursor: 'pointer'}} onClick={() => setLogoutButton(true)}>
                        <Avatar className="user-avtaar" src="/broken-image.jpg"/>
                        <span>{user.fullname}</span>
                    </div>

                    {logoutButton ? (<Button
                    disableRipple
                    sx={{
                        backgroundColor: '#FF8C00',
                        width: '100px',
                        height: '40px',
                        color: 'white',
                        boxShadow: 'none',
                        borderRadius: '1rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

                        '&:hover': {
                            backgroundColor: '#e36003ff',
                            boxShadow: 'none'
                        },

                        '&:active': {
                            backgroundColor: '#e36003ff',
                            boxShadow: 'none'
                        }
                    }}
                    variant='contained'
                    onClick={async() => { 
                        navigate("/");
                        await logout();
                        setLogoutButton(false);
                    }}
                >Logout</Button>) : (<></>)}
                </div>) : (<Button
                    disableRipple
                    sx={{
                        backgroundColor: '#FF8C00',
                        width: '150px',
                        height: '40px',
                        color: 'white',
                        boxShadow: 'none',
                        borderRadius: '1rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

                        '&:hover': {
                            backgroundColor: '#e36003ff',
                            boxShadow: 'none'
                        },

                        '&:active': {
                            backgroundColor: '#e36003ff',
                            boxShadow: 'none'
                        }
                    }}
                    variant='contained'
                    onClick={() => navigate('/register')}
                >Register</Button>)}
            </div>
        </nav>
    )
} 