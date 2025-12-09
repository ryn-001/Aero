import {useState} from 'react';
import { PiLeafLight } from "react-icons/pi";
import {Button} from "@mui/material";
import "./Navbar.css";

export default function Navbar(){

    const handleTrips = () => {

    }

    const handleSignUp = () => {
        
    }

    return(
        <nav className='navbar'>
            <div className='nav-logo'>
                <PiLeafLight />Aero
            </div>

            <div className='nav-content'>
                <Button 
                    disableRipple
                    sx={{
                        width: '150px',
                        height: '40px',
                        borderRadius: '1rem',
                        color: 'black',
                        
                        '&:hover':{
                            backgroundColor: '#e7e7e7ff',
                            boxShadow: 'none'
                        },

                        '&:active':{
                            backgroundColor: '#e7e7e7ff',
                            boxShadow: 'none'
                        }
                    }}
                    variant='text'>My Trips</Button>
                <Button 
                    disableRipple
                    sx={{
                        backgroundColor: '#f25207',
                        width: '150px',
                        height: '40px',
                        color : 'white',
                        boxShadow: 'none',
                        borderRadius: '1rem',

                        '&:hover':{
                            backgroundColor: '#da5112ff',
                            boxShadow: 'none'
                        },

                        '&:active':{
                            backgroundColor: '#da5112ff',
                            boxShadow: 'none'
                        }
                    }}
                    variant='contained'>Sign Up</Button>
            </div>
        </nav>
    )
} 