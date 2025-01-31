// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Import comment model
const Comment = require('./models/comment');

// Import mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comments', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Handle POST request
app.use(express.json());
app.post('/comments', async (req, res) => {
    const { name, email, message } = req.body;
    const comment = new Comment({ name, email, message });
    await comment.save();
    res.json(comment);
});

// Handle GET request
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

// Start web server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

