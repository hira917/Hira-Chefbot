const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Import models
const Recipe = require('./models/Recipe');  // ✅ ADD THIS

// Import routes
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Debug route (temporary)
app.get('/api/debug/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({ isActive: true });
    res.json({
      total: recipes.length,
      recipes: recipes.map(r => ({ title: r.title, category: r.category }))
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);  // ✅ THIS MUST BE HERE

app.get('/', (req, res) => {
  res.send('ChefBot Server Running');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(5000, () => console.log('🚀 Server on port 5000'));
  })
  .catch(err => console.log('❌ Error:', err));