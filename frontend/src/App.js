import React, { useState } from 'react';
import axios from 'axios';

function App() {
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
                const response = await axios.post('http://localhost:8000/predict/', formData, {
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
        <div>
            <h1>Waste Classifier</h1>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Classifying...' : 'Classify'}
            </button>
            {prediction && (
                <div>
                    <h2>Prediction Result</h2>
                    <p>Class: {prediction.predicted_label}</p>
                    <p>Category: {prediction.category}</p>
                </div>
            )}
        </div>
    );
}

export default App;
