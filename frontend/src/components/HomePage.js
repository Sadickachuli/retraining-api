import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import imageSrc from '../assets/home-image.png';  

function HomePage() {
    return (
        <Container
            style={{
        textAlign: 'center',
        background: 'linear-gradient(135deg, #000000 30%, #4CAF50 70%)', 
        minHeight: '90vh',  
        minWidth: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: '20px',
            }}
        >
            {/* Left section with text */}
            <div style={{ flex: 1 }}>
            <Typography
    variant="h3"
    gutterBottom
    sx={{
        color: 'black',
        textShadow: '0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #4CAF50',
    }}
>
    Welcome to RecycleWise!
</Typography>
<Typography
    variant="h6"
    gutterBottom
    sx={{
        color: 'white',  
    }}
>
    A web application to help you classify waste into recyclable and non-recyclable categories.
</Typography>

                <Button
                    variant="contained"
                    style={{ 
                        backgroundColor: 'black',  
                        color: '#4CAF50',  
                         border: '2px solid #4CAF50', 
                         borderRadius: '20px', 
                        padding: '6px 16px',  
                    }}
                    size="large"
                    component={Link}
                    to="/predict"
                >
                    Start Classifying
                </Button>
            </div>

            {/* Right section with image */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'right' }}>
                <img
                    src={imageSrc} 
                    alt="RecycleWise"
                    style={{
                        width: '70%',
                        height: 'auto',
                        objectFit: 'contain',
                        marginTop: '20px',
                    }}
                />
            </div>
        </Container>
    );
}

export default HomePage;
