const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
