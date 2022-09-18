// Setup empty JS object to act as endpoint for all routes
projectData = {
  date: '',
  temp: 0,
  feel: '',
};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/*
 * Middleware
 */
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
// Callback to debug
const port = 8000;
app.listen(port, () => {
  console.log(`The Server is running on ${port}`);
});

// Initialize all route with a callback function
// Get request to return projectData object
app.get('/all', (_req, res) => {
  res.json(projectData);
});

// Post request to create a new entry in the apps endpoint (projectData)
app.post('/postData', (req, _res) => {
  projectData = req.body;
});
