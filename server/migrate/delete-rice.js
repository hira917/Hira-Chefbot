const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config({ path: '../.env' });
console.log('=== DELETE RICE RECIPES SCRIPT ===');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('=== END DEBUG ===');
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

// List of rice recipe titles to delete
const riceRecipesToDelete = [
  "Chicken Biryani",
  "Mutton Biryani",
  "Beef Biryani",
  "Chicken Pulao",
  "Mutton Pulao",
  "Vegetable Pulao",
  "Chicken Fried Rice",
  "Egg Fried Rice",
  "Vegetable Fried Rice",
  "Shrimp Fried Rice",
  "Singapore Fried Rice",
  "Simple Khichdi",
  "Vegetable Khichdi",
  "Masala Khichdi",
  "Sabudana Khichdi",
  "Zarda",
  "Kheer",
  "Tomato Rice",
  "Lemon Rice",
  "Coconut Rice",
  "Curd Rice",
  "Kabuli Pulao",
  "Pakistani Pulao",
  "Fish Biryani",
  "Keema Rice",
  "Saffron Rice",
  "Zeera Rice"
];

async function deleteRiceRecipes() {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGOURI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI not found in environment variables');
    }
    
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      family: 4
    });
    
    console.log('✅ Connected to MongoDB!');
    
    let deleted = 0;
    let notFound = 0;

    for (let title of riceRecipesToDelete) {
      const result = await Recipe.deleteOne({ title: title });
      if (result.deletedCount > 0) {
        console.log(`✅ Deleted: ${title}`);
        deleted++;
      } else {
        console.log(`❌ Not found: ${title}`);
        notFound++;
      }
    }

    console.log('\n🎉 Deletion Complete!');
    console.log(`📊 Deleted: ${deleted}, Not Found: ${notFound}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

deleteRiceRecipes();