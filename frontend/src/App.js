import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import PredictionPage from './components/PredictionPage';
import RetrainingPage from './components/RetrainingPage';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import logo from '../src/assets/logo.png';

function App() {
    return (
        <Router>
            {/* Transparent AppBar */}
            <AppBar
                position="static"
                style={{
                    color: 'white',
                    backgroundColor: 'transparent',
                    border: '1px solid #4CAF50',
                    boxShadow: 'none',
                }}
            >
                <Toolbar>
                    {/* Flex container for logo and buttons */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        {/* Logo on the left */}
                        <Box
                            component="img"
                            src={logo}
                            alt="RecycleWise Logo"
                            sx={{
                                maxWidth: '100px', 
                                height: '90px',
                            }}
                        />

                        {/* Buttons on the right */}
                        <Box>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#4CAF50',
                                    border: '2px solid #4CAF50',
                                    borderRadius: '20px',
                                    padding: '6px 16px',
                                    marginRight: '16px',
                                }}
                            >
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/predict"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#4CAF50',
                                    border: '2px solid #4CAF50',
                                    borderRadius: '20px',
                                    padding: '6px 16px',
                                    marginRight: '16px',
                                }}
                            >
                                Prediction
                            </Button>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/retrain"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#4CAF50',
                                    border: '2px solid #4CAF50',
                                    borderRadius: '20px',
                                    padding: '6px 16px',
                                }}
                            >
                                Retrain Model
                            </Button>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/predict" element={<PredictionPage />} />
                <Route path="/retrain" element={<RetrainingPage />} /> {/* Add the retraining route */}
            </Routes>
        </Router>
    );
}

export default App;
