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
                            backgroundColor: '#D3D3D3',
                            boxShadow: 'none'
                        },

                        '&:active':{
                            backgroundColor: '#D3D3D3',
                            boxShadow: 'none'
                        }
                    }}
                    variant='text'>My Trips</Button>
                    
                <Button 
                    disableRipple
                    sx={{
                        backgroundColor: '#FF8C00',
                        width: '150px',
                        height: '40px',
                        color : 'white',
                        boxShadow: 'none',
                        borderRadius: '1rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

                        '&:hover':{
                            backgroundColor: '#CC5500',
                            boxShadow: 'none'
                        },

                        '&:active':{
                            backgroundColor: '#CC5500',
                            boxShadow: 'none'
                        }
                    }}
                    variant='contained'>Sign Up</Button>
            </div>
        </nav>
    )
} 