const express = require('express');
const app = express();
const authMiddleware = require("./middlewares/Auth.middleware")
const router = require("./router/Auth.route")
const cors = require("cors")
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// new test update second update for pull request webhooks 
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // cross orign resorce sharing test 



app.use("/api", router)
app.get('/', authMiddleware, (req, res) => {
    res.send('Hello, world!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});


const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to database');
});

mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from database');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection closed');
        process.exit(0);
    });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
