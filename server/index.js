const express = require('express');
const app = express();
const port = 4000;
const mongoDB = require('./db'); // Ensure this connects to your MongoDB

mongoDB(); // Connect to MongoDB

// Middleware to handle CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api', require('./Routes/createUser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));
// Root route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
