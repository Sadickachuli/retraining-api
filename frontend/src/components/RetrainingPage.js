import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';

function RetrainingPage() {
    const [dataset, setDataset] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [metrics, setMetrics] = useState(null);

    const handleDatasetChange = (e) => {
        setDataset(e.target.files[0]);
    };

    const handleRetrain = async () => {
        if (dataset) {
            const formData = new FormData();
            formData.append('file', dataset);
            setIsLoading(true);
            setMetrics(null);

            try {
                const response = await axios.post('https://wt-model-api.onrender.com/retrain', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response.status === 200) {
                    setMessage('Retraining completed successfully!');
                    setMetrics(response.data);
                } else {
                    setMessage('Retraining failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage('An error occurred during retraining. Please try again.');
            } finally {
                setIsLoading(false);
            }
        } else {
            alert('Please upload a dataset.');
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
                    color: '#4CAF50',
                }}
            >
                Retrain the Waste Classifier Model
            </Typography>
            <Box
                component="input"
                type="file"
                onChange={handleDatasetChange}
                sx={{
                    marginBottom: '20px',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '2px solid #4CAF50',
                    outline: 'none',
                }}
            />
            <Button
                variant="contained"
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    borderRadius: '20px',
                    padding: '10px 20px',
                }}
                size="large"
                onClick={handleRetrain}
                disabled={isLoading}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Retrain Model'}
            </Button>

            {message && (
                <Typography
                    variant="body1"
                    style={{
                        marginTop: '20px',
                        color: message.includes('success') ? 'green' : 'red',
                    }}
                >
                    {message}
                </Typography>
            )}

            {metrics && (
                <Box mt={4}>
                    <Typography variant="h6">Model Metrics:</Typography>
                    <Typography>Accuracy: {metrics.accuracy.toFixed(4)}</Typography>
                    <Typography>Loss: {metrics.loss.toFixed(4)}</Typography>
                </Box>
            )}
        </Container>
    );
}

export default RetrainingPage;
