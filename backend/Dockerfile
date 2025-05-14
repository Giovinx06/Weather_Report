# Dockerfile (backend)
FROM python:3.10-slim

# Set environment variables for Flask
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_APP=app.py
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app source code
COPY . .

# Run the Flask app
CMD ["flask", "run"]
