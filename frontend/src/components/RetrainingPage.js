import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';

function RetrainingPage() {
    const [dataset, setDataset] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [modelAvailable, setModelAvailable] = useState(false);
    const [modelUrl, setModelUrl] = useState('');

    const handleDatasetChange = (e) => {
        setDataset(e.target.files[0]);
    };

    const handleRetrain = async () => {
        if (dataset) {
            const formData = new FormData();
            formData.append('file', dataset);
            setIsLoading(true);

            try {
                const response = await axios.post('https://wt-model-api.onrender.com/retrain', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                if (response.status === 200) {
                    setMessage('Retraining triggered successfully. Wait for the model to be ready!');
                    checkModelAvailability();
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

    const checkModelAvailability = async () => {
        try {
            const modelBlob = await axios.get('https://wt-model-api.onrender.com/model', {
                responseType: 'blob',
            });

            if (modelBlob && modelBlob.data) {
                const url = window.URL.createObjectURL(new Blob([modelBlob.data]));
                setModelUrl(url);
                setModelAvailable(true);
                setMessage('The model is ready for download!');
            } else {
                setModelAvailable(false);
                setMessage('Model is not available yet. Please try again later.');
            }
        } catch (error) {
            console.error('Error downloading the model:', error);
            setModelAvailable(false);
            setMessage('Error downloading the model. Please try again later.');
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = modelUrl;
        link.setAttribute('download', 'new_model.h5');
        document.body.appendChild(link);
        link.click();
        link.remove();
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
            <Typography variant="body1" style={{ marginBottom: '20px', color: '#555' }}>
                Upload a new dataset to improve the waste classification model.
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

            {modelAvailable && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownload}
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '10px 20px',
                    }}
                >
                    Download the Retrained Model
                </Button>
            )}
        </Container>
    );
}

export default RetrainingPage;
