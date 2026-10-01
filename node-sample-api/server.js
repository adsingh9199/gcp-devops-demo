const express = require("express");
const packageJson = require("./package.json");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;
const APP_VERSION = process.env.APP_VERSION || packageJson.version;
const ENVIRONMENT = process.env.ENVIRONMENT || "development";

const sampleData = {
  id: 101,
  name: "GKE Node Sample API",
  technology: "Node.js",
  environment: ENVIRONMENT,
  message: "Hello from GKE Node.js API"
};


// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    application: "node-sample-api",
    applicationVersion: APP_VERSION,
    environment: ENVIRONMENT
  });
});


// ------------------------------------------------------
// Health Check API
// ------------------------------------------------------
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    application: "node-sample-api",
    applicationVersion: APP_VERSION,
    environment: ENVIRONMENT,
    podName: process.env.HOSTNAME || "local",
    timestamp: new Date().toISOString()
  });
});


// ------------------------------------------------------
// GET API
// ------------------------------------------------------
app.get("/api/data", (req, res) => {
  res.status(200).json({
    status: "success",
    method: "GET",
    applicationVersion: APP_VERSION,
    environment: ENVIRONMENT,
    podName: process.env.HOSTNAME || "local",
    data: sampleData
  });
});


// ------------------------------------------------------
// POST API
// ------------------------------------------------------
app.post("/api/data", (req, res) => {
  res.status(200).json({
    status: "success",
    method: "POST",
    applicationVersion: APP_VERSION,
    environment: ENVIRONMENT,
    podName: process.env.HOSTNAME || "local",
    sampleData: sampleData,
    receivedData: req.body
  });
});


app.listen(PORT, "0.0.0.0", () => {
  console.log("------------------------------------------");
  console.log("Node.js Sample API Started");
  console.log(`Port                : ${PORT}`);
  console.log(`Application Version : ${APP_VERSION}`);
  console.log(`Environment         : ${ENVIRONMENT}`);
  console.log("------------------------------------------");
});
