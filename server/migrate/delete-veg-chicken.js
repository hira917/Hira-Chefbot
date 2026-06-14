const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config({ path: '../.env' });
console.log('=== DELETE VEG CHICKEN SCRIPT ===');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('=== END DEBUG ===');

const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

// List of veg chicken recipe titles to delete
const vegChickenToDelete = [
  "Chicken Aloo",
  "Chicken Aloo Matar",
  "Chicken Aloo Baingan",
  "Chicken Aloo Shimla Mirch",
  "Chicken Aloo Gobhi",
  "Chicken Aloo Palak",
  "Chicken Aloo Tamatar",
  "Chicken Aloo Beans",
  "Chicken Matar",
  "Chicken Matar Malai",
  "Chicken Matar Pulao",
  "Chicken Matar Korma",
  "Chicken Matar Keema",
  "Chicken Palak",
  "Chicken Palak Malai",
  "Chicken Palak Aloo",
  "Chicken Palak Matar",
  "Chicken Shimla Mirch",
  "Chicken Shimla Mirch Aloo",
  "Chicken Shimla Mirch Matar",
  "Chicken Shimla Mirch Pyaz",
  "Chicken Gobhi",
  "Chicken Gobhi Aloo",
  "Chicken Gobhi Matar",
  "Chicken Baingan",
  "Chicken Baingan Aloo",
  "Chicken Baingan Bharta",
  "Chicken Tori",
  "Chicken Louki",
  "Chicken Tori Aloo"
];

async function deleteVegChicken() {
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
    
    console.log('Connected to MongoDB!');
    
    let deleted = 0;
    let notFound = 0;

    for (let title of vegChickenToDelete) {
      const result = await Recipe.deleteOne({ title: title });
      if (result.deletedCount > 0) {
        console.log(`Deleted: ${title}`);
        deleted++;
      } else {
        console.log(`Not found: ${title}`);
        notFound++;
      }
    }

    console.log('\nDeletion Complete!');
    console.log(`📊 Deleted: ${deleted}, Not Found: ${notFound}`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

deleteVegChicken();





