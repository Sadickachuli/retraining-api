import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, CircularProgress } from '@mui/material';

function PredictionPage() {
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (image) {
            const formData = new FormData();
            formData.append('file', image);
            setIsLoading(true);

            try {
                // Update the backend URL to your live deployment
                const response = await axios.post('https://recyclewise-backend.onrender.com/predict/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setPrediction(response.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            alert('Please select an image.');
        }
    };

    return (
        <Container
            style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, #ffffff 30%, #4CAF50 70%)',
                minHeight: '90vh',
                minWidth: '99vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '40px',
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                style={{
                    fontWeight: 'bold',
                    color: '#4CAF50',  // Green text color for the header
                }}
            >
                Upload an Image for Classification
            </Typography>

            <input
                type="file"
                onChange={handleImageChange}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50',
                }}
            />
            <br />
            <Button
                variant="contained"
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '20px',
                    padding: '10px 20px',
                    marginBottom: '20px',
                }}
                size="large"
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Classify'}
            </Button>

            {prediction && (
                <div
                    style={{
                        marginTop: '30px',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        textAlign: 'left',
                        width: '80%',
                        maxWidth: '500px',
                    }}
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                        style={{
                            fontWeight: 'bold',
                            color: '#4CAF50',
                        }}
                    >
                        Prediction Result
                    </Typography>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        <strong>Class:</strong> {prediction.predicted_label}
                    </Typography>
                    <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                        <strong>Category:</strong> {prediction.category}
                    </Typography>
                </div>
            )}
        </Container>
    );
}

export default PredictionPage;
