// Import necessary modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express application
const app = express();

// Configure middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

// Get route
app.get('/', function (req, res) {
    // Serve the main HTML file
    res.sendFile(path.resolve('dist/index.html'));
});

// Post route
app.post('/add', postInfo);

function postInfo(req, res) {
    // Store data from the request in projectData
    projectData['depCity'] = req.body.depCity;
    projectData['arrCity'] = req.body.arrCity;
    projectData['depDate'] = req.body.depDate;
    projectData['weather'] = req.body.weather;
    projectData['daysLeft'] = req.body.daysLeft;

    // Send the updated projectData in the response
    res.send(projectData);
}

// Set the port for the server
const port = 8080;

// Start the server
const server = app.listen(port, listening);

// Callback function when the server starts
function listening() {
    console.log(`Server starts on port ${port}`);
}
