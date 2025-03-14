const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Budget = require('./models/Budget'); // Import the Budget model

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/personalBudget', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

/**
 * GET Endpoint to Fetch Budget Data
 */
app.get('/budget', async (req, res) => {
    try {
        const budgetData = await Budget.find();
        res.json(budgetData);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch budget data" });
    }
});

/**
 * POST Endpoint to Add Budget Data
 */
app.post('/budget', async (req, res) => {
    try {
        const { title, budget, color } = req.body;

        const newBudget = new Budget({
            title,
            budget,
            color
        });

        await newBudget.save();
        res.status(201).json(newBudget);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
