const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config({ path: '../.env' });
console.log('=== DELETE PURE MUTTON RECIPES SCRIPT ===');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('=== END DEBUG ===');

const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

// List of mutton recipe titles to delete
const muttonRecipesToDelete = [
  "Mutton Curry",
  "Mutton Karahi",
  "Mutton Handi",
  "Mutton Qorma",
  "Mutton Rogan Josh",
  "Mutton Do Pyaza",
  "Mutton Bhuna",
  "Mutton Jalfrezi",
  "White Mutton Karahi",
  "Peshawari Mutton Karahi",
  "Spicy Mutton Karahi",
  "Dry Mutton Karahi",
  "Mutton Masala",
  "Mutton Tikka Masala",
  "Mutton Butter Masala",
  "Mutton Lababdar",
  "Mutton Kolhapuri",
  "Kashmiri Rogan Josh",
  "Easy Rogan Josh",
  "Pressure Cooker Rogan Josh",
  "Mutton Kofta Curry",
  "Mutton Kofta in Yogurt Gravy",
  "Nargisi Kofta",
  "Malai Kofta",
  "Mutton Rara",
  "Mutton Rara Masala",
  "Hyderabadi Mutton",
  "Punjabi Mutton",
  "Kerala Mutton Curry",
  "Chettinad Mutton",
  "Goan Mutton Curry",
  "Mutton Chops Curry",
  "Mutton Chops Karahi",
  "Grilled Mutton Chops"
];

async function deleteMuttonRecipes() {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGOURI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI not found in environment variables');
    }
    
    console.log(' Connecting to MongoDB...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      family: 4
    });
    
    console.log(' Connected to MongoDB!');
    
    let deleted = 0;
    let notFound = 0;

    for (let title of muttonRecipesToDelete) {
      const result = await Recipe.deleteOne({ title: title });
      if (result.deletedCount > 0) {
        console.log(` Deleted: ${title}`);
        deleted++;
      } else {
        console.log(` Not found: ${title}`);
        notFound++;
      }
    }

    console.log('\n Deletion Complete!');
    console.log(` Deleted: ${deleted}, Not Found: ${notFound}`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

deleteMuttonRecipes();