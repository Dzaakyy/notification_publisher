const express = require('express');
const Publisher = require('../src/services/publisher');
const app = express();
const publisher = new Publisher();
const PORT = 8081;

app.use(express.json());

app.post('/publish', async (req, res) => {
    try {
        const { order_id, user_id, content, timestamp } = req.body;

        await publisher.publishMessage('notification', { order_id, user_id, content, timestamp });
        res.status(200).json({ code: 200, message: 'Message published successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to publish notification' });
    }
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});