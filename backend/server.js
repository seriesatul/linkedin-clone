// backend/server.js

// --- FIX IS HERE ---
// Load environment variables from .env file AT THE VERY TOP
require('dotenv').config();
// --- END OF FIX ---

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// 'require('dotenv').config();' was moved from here to the top

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));