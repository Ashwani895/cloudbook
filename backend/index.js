require('dotenv').config(); // add this at top if using .env

const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});