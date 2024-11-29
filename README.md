# RecycleWiser API

## Project Description
**RecycleWiser** is a project aimed at automating the classification of water quality and potability using machine learning models. The project consists of two primary components:
1. **Image Prediction API** – An API that uses trained models to predict water quality based on input images.
2. **Model Retraining API** – An API for retraining the water quality model with new data to improve prediction accuracy and adapt to new conditions.

The project is designed to be deployed on cloud platforms and enables real-time predictions and the ability to retrain the model when needed.

## Deployed APIs
- **Image Prediction API**: [https://recyclewiser-api.onrender.com/](https://recyclewiser-api.onrender.com/)
- **Model Retraining API**: [https://wt-model-api.onrender.com/](https://wt-model-api.onrender.com/)

These APIs can be used to interact with the water quality models for prediction and retraining purposes.

## Project Setup

### Prerequisites
Ensure you have the following installed on your local machine:
- **Docker Desktop** (with Docker Compose support)
- **Git** (optional, for cloning the project repository)
- **Node.js** (for running the frontend locally)
- **Python 3.9** or higher (for the backend, if you prefer not to use Docker)

### Step-by-step Setup

#### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the Repository (optional)
git clone https://github.com/your-username/recyclewiser-app.git
cd recyclewiser-app

Navigate to the Project Directory: Make sure you are in the root directory of the project, where docker-compose.yml is located.

Build and Run the Containers: Use Docker Compose to build and start both the frontend and backend services:

//bash
docker-compose up --build
