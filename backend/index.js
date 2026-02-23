require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

connectToMongo();

const app = express();


const port = process.env.PORT || 8000;


app.use(cors({
  origin: "*",   
}));

app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).send("Cloudbook Backend Running 🚀");
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});