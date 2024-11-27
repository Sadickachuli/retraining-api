# Use the official Python slim image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application code into the container
COPY . /app

# Install dependencies from the requirements
RUN pip install --no-cache-dir fastapi uvicorn requests pillow
RUN pip install --no-cache-dir python-multipart

# Expose the backend port
EXPOSE 8000

# Define the command to run the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
