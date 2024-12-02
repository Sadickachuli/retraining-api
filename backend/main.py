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
    allow_origins=[
        "http://localhost:3000", 
        "https://recyclewise-frontend.onrender.com/"  
    ],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read image bytes and open the image using PIL
        image_bytes = await file.read()
        image = Image.open(BytesIO(image_bytes))

        # Send image to external API for prediction
        prediction_api_url = "https://recyclewiser-api.onrender.com/predict/"
        files = {"file": image_bytes}
        response = requests.post(prediction_api_url, files=files)

        # Log the response for debugging
        print("Response from external API:", response.text)

        # Handle successful response
        if response.status_code == 200:
            prediction_data = response.json()

            
            prediction_data.pop('confidence', None)

            return prediction_data  
        else:
            # Return a JSON response with an error if the prediction fails
            return JSONResponse(status_code=500, content={"error": "Failed to classify image"})

    except Exception as e:
        # Handle unexpected errors and log them
        print("Error occurred:", e)
        return JSONResponse(status_code=500, content={"error": "An unexpected error occurred"})

if __name__ == "__main__":
    import uvicorn
    # Run the FastAPI app with uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
