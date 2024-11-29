# RecycleWise APP
![28 11 2024_17 55 09_REC](https://github.com/user-attachments/assets/a78fe8aa-e651-498b-8e0e-d581b3e2b50f)

## Project Description
**RecycleWise** is a project aimed at automating the classification of waste using machine learning model. The project consists of two primary components:
1. **Image Prediction API** – An API that uses a trained model to predict waste into either recyclable or non-recyclable based on input images.
2. **Model Retraining API** – An API for retraining a water quality model with new data to improve prediction accuracy and adapt to new conditions.
## Explanation for using a different model for retraining:
For my *Image prediction API*, I converted my original .keras model to a TensorFlow Lite model, as it is lightweight and works seamlessly within Render's 512MB memory limit. However, retraining the model was an issue due to the fact that retraining requires the original .keras model, as TensorFlow Lite models are not designed for retraining. Also, adding the .keras model to the deployment exceeded Render's free-tier memory limit (512MB), resulting in an "Out of Memory" error during runtime. I had to improvise by using a lighter model.

The project is designed to be deployed on cloud platforms and enables real-time predictions and the ability to retrain the model when needed.

## Deployed APIs
- **Image Prediction API**: [https://recyclewiser-api.onrender.com/](https://recyclewiser-api.onrender.com/)
- **Model Retraining API**: [https://wt-model-api.onrender.com/](https://wt-model-api.onrender.com/)

These APIs can be used to interact with the waste classification model for prediction and water quality model for retraining purposes.

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
```
Navigate to the Project Directory: Make sure you are in the root directory of the project, where docker-compose.yml is located.

Build and Run the Containers: Use Docker Compose to build and start both the frontend and backend services:

```bash
docker-compose up --build
```
This will build the frontend and backend images according to the Dockerfile definitions and start the services. The frontend will be accessible at http://localhost:3000/, and the backend at http://localhost:8000/.

#### Option 2: Running the Frontend Locally with npm start
##### 1. Navigate to the Frontend Directory:
```bash
cd frontend
```
##### 2. Install Dependencies: Run the following command to install the necessary Node.js dependencies:
```bash
npm install
```
##### 3. Start the Frontend: Run the command below to start the frontend server:
```bash
npm start
```
The frontend will now be accessible at http://localhost:3000/.

##### 4. Run the Backend: If you prefer running the backend separately, navigate to the backend directory and install the Python dependencies:
```bash
cd ../backend
pip install -r requirements.txt
```
##### 5. Start the backend server with:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```
### API Endpoints
#### Image Prediction Endpoint
- URL: https://recyclewiser-api.onrender.com/
- Method: POST
- Description: This endpoint accepts image data for waste classification. It returns a prediction of either recyclable or non-recyclable depending on the input image.
### Sample images:

- **Cardboard:**
                                      ![cardboard1](https://github.com/user-attachments/assets/ed023837-8ecf-403f-aa7c-0ef7c5125593)
- **Glass:**
                                      ![glass1](https://github.com/user-attachments/assets/221162c8-bda8-4265-a748-930b99c66653)
- **Metal:**
                                      ![metal2](https://github.com/user-attachments/assets/2405f825-077a-48e9-be56-898cf9c5732b)
- **Paper:**
                                      ![paper1](https://github.com/user-attachments/assets/64149dfc-900f-49e2-8e80-22fe6f4d4951)
- **Plastic:**
                                      ![plastic1](https://github.com/user-attachments/assets/1e94e852-2f85-4d40-8295-c62a94428b42)
- **Trash:**
                                      ![trash7](https://github.com/user-attachments/assets/bf362575-32a0-428d-a0e4-f5c1c906027e)


### Model Retraining Endpoint
#### URL: https://wt-model-api.onrender.com/
- Method: POST
- Description: This endpoint allows retraining of the water quality model with new data. This is unrelated to image prediction and focuses on updating the model to enhance its predictive performance.

## Loading a Docker Image
- To load the Docker image on your system, use:
```bash
docker load -i waste-classifier-app.tar
```

## Troubleshooting
Docker Desktop Not Running: Ensure Docker Desktop is active before running the docker-compose commands.
API Connectivity Issues: Check for any network restrictions or firewall settings that may block access to the API endpoints.

### A Docker image is located at the root of the project.

### Results from Flood Request Simulation [LOCUST]

![29 11 2024_17 54 13_REC](https://github.com/user-attachments/assets/d7771605-c173-4a1d-87f5-db8daa3e7c8e)
