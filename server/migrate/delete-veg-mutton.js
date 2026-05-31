const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config({ path: '../.env' });
console.log('=== DELETE VEG MUTTON SCRIPT ===');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('=== END DEBUG ===');

const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

// List of mutton recipes to delete
const recipesToDelete = [
  "Mutton Aloo",
  "Mutton Aloo Matar",
  "Mutton Aloo Baingan",
  "Mutton Aloo Shimla Mirch",
  "Mutton Aloo Gobhi",
  "Mutton Aloo Palak",
  "Mutton Aloo Tamatar",
  "Mutton Aloo Beans",
  "Mutton Matar",
  "Mutton Matar Malai",
  "Mutton Matar Pulao",
  "Mutton Matar Korma",
  "Mutton Matar Keema",
  "Mutton Palak",
  "Mutton Palak Malai",
  "Mutton Palak Aloo",
  "Mutton Palak Matar",
  "Mutton Shimla Mirch",
  "Mutton Shimla Mirch Aloo",
  "Mutton Shimla Mirch Matar",
  "Mutton Shimla Mirch Pyaz",
  "Mutton Gobhi",
  "Mutton Gobhi Aloo",
  "Mutton Gobhi Matar",
  "Mutton Baingan",
  "Mutton Baingan Aloo",
  "Mutton Baingan Bharta",
  "Mutton Tori",
  "Mutton Louki",
  "Mutton Tori Aloo",
  "Mutton Karela",
  "Mutton Karela Aloo",
  "Mutton Karela Masala",
  "Mutton Methi",
  "Mutton Methi Malai",
  "Mutton Methi Aloo",
  "Mutton Beans",
  "Mutton Beans Aloo",
  "Mutton Beans Matar",
  "Mutton Tinday",
  "Mutton Kaddu",
  "Mutton Kaddu Aloo",
  "Mutton Kaddu Ka Bharta",
  "Mutton Arvi",
  "Mutton Arvi Aloo",
  "Mutton Mix Vegetable",
  "Mutton Jalfrezi",
  "Mutton Karahi with Veggies",
  "Mutton Handi with Veg",
  "Mutton Vegetable Curry",
  "Mutton Saag",
  "Mutton Sarson Ka Saag",
  "Mutton Lauki Kofta",
  "Mutton Vegetable Pulao",
  "Mutton Pumpkin Kofta"
];

async function deleteRecipes() {
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

    for (let title of recipesToDelete) {
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

deleteRecipes();