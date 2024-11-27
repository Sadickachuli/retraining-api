import os
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import requests
from PIL import Image

# Create FastAPI instance
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow React frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(BytesIO(image_bytes))

    # Send image to external API
    prediction_api_url = "https://recyclewiser-api.onrender.com/predict/"
    files = {"file": image_bytes}
    response = requests.post(prediction_api_url, files=files)

    # Log the response for debugging
    print("Response from external API:", response.text)

    if response.status_code == 200:
        prediction_data = response.json()

        # Remove the 'confidence' field from the response
        prediction_data.pop('confidence', None)  # Remove the confidence key if it exists

        return prediction_data  # Return the cleaned response without confidence
    else:
        return JSONResponse(status_code=500, content={"error": "Failed to classify image"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
