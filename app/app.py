from flask import Flask, jsonify
import os

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({
        "application": "GCP DevOps Demo",
        "environment": "DEV",
        "version": os.getenv("APP_VERSION", "1.0"),
        "status": "running"
    })


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    }), 200


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=8080
    )
