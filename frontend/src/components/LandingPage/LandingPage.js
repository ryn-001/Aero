import { useState, useRef, useEffect } from 'react';
import BlurText from "../Animated Components/BlurText";
import { Button } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { gsap } from "gsap";
import './LandingPage.css';

export default function LandingPage() {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [description,setDescription] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        if (description && buttonRef.current) {
            gsap.fromTo(buttonRef.current, 
                { opacity: 0, y: 20, visibility: 'hidden' },
                { opacity: 1, y: 0, visibility: 'visible', duration: 0.6, ease: "power3.out" }
            );
        }
    }, [description]);

    
    return (
        <div className="landing-page">
            <header style={{ textAlign: 'center' }}>
                <BlurText
                    text="Discover Your Next Adventure"
                    delay={150}
                    animateBy="words"
                    color='#FF8C00'
                    onAnimationComplete={() => setFirst(true)}
                />

                <BlurText
                    text="Personalized Itineraries at Your Fingertips"
                    delay={150}
                    animateBy="words"
                    start={first}
                    onAnimationComplete={() => setSecond(true)}
                />

                <BlurText
                    className="description"
                    text="Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget."
                    delay={0}
                    animateBy="words"
                    start={second}
                    onAnimationComplete={() => setDescription(true)}
                />

                <div ref={buttonRef} style={{ opacity: 0, visibility: 'hidden' }}>
                    <Button
                        className='get-started-button'
                        disableRipple
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'black',
                            color: 'white',
                            width: '180px',
                            height: '45px',
                            margin: '2rem auto 0 auto',
                            borderRadius: '1rem',
                            boxShadow: '0 2px 4px rgba(98, 98, 98, 0.1)',
                            '&:hover': { backgroundColor: '#181818ff', boxShadow: 'none' },
                            '&:active': { backgroundColor: '#181818ff', boxShadow: 'none' },
                        }}
                        variant='contained'
                    >
                        Get Started <FaArrowRight />
                    </Button>
                </div>
            </header>
        </div>
    )
}
