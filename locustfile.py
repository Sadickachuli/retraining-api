from locust import HttpUser, task, between
from io import BytesIO
from PIL import Image
import random

class PredictionUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def predict(self):
        # Generate a dummy image for testing
        image = Image.new("RGB", (100, 100), (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255)))
        image_bytes = BytesIO()
        image.save(image_bytes, format="JPEG")
        image_bytes.seek(0)

        # Prepare multipart/form-data payload
        files = {"file": ("test.jpg", image_bytes, "image/jpeg")}

        # Send POST request to /predict/
        with self.client.post("/predict/", files=files, catch_response=True) as response:
            if response.status_code != 200:
                response.failure(f"Failed with status code {response.status_code}: {response.text}")
