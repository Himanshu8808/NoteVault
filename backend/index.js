const connectToMongo = require('./db');
require('dotenv').config();
const express = require('express');
const cors = require('cors')
connectToMongo();
const app = express();
const port =process.env.port;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use(cors())
app.use(express.json());
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/notes', require('./routes/notes.js'));
app.listen(port, () => {
    console.log('Server is running on port', port)
  })