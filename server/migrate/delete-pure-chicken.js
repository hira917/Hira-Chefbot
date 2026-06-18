const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config({ path: '../.env' });
console.log('=== DELETE PURE CHICKEN RECIPES SCRIPT ===');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('=== END DEBUG ===');
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

// List of chicken recipe titles to delete
const chickenRecipesToDelete = [
  "Chicken Curry",
  "Chicken Karahi",
  "Chicken Handi",
  "Chicken Qorma",
  "Chicken Jalfrezi",
  "Chicken Lahori",
  "Chicken Mughlai",
  "Chicken Do Pyaza",
  "White Chicken Karahi",
  "Peshawari Chicken Karahi",
  "Spicy Chicken Karahi",
  "Chicken Karahi with Gravy",
  "Dry Chicken Karahi",
  "Chicken Masala",
  "Chicken Tikka Masala",
  "Chicken Butter Masala",
  "Chicken Lababdar",
  "Chicken Kolhapuri",
  "Oven Roasted Chicken",
  "Tandoori Chicken",
  "Chicken Roast with Gravy",
  "Chicken Boneless Curry",
  "Chicken Malai Boti",
  "Chicken Kali Mirch",
  "Chicken Hariyali",
  "Chicken Handi Traditional",
  "Chicken Handi with Cream",
  "Spicy Chicken Handi",
  "Chicken Bhuna",
  "Chicken Bhuna Masala"
];

async function deleteChickenRecipes() {
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

    for (let title of chickenRecipesToDelete) {
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

deleteChickenRecipes();