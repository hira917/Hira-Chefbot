const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config({ path: '../.env' });
console.log('=== DELETE PLAIN VEGETABLES RECIPES SCRIPT ===');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('=== END DEBUG ===');

const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

// List of vegetable recipe titles to delete
const vegRecipesToDelete = [
  "Aloo Ki Sabzi",
  "Aloo Matar",
  "Aloo Baingan",
  "Aloo Shimla Mirch",
  "Aloo Gobhi",
  "Aloo Palak",
  "Aloo Tamatar",
  "Aloo Beans",
  "Aloo Karela",
  "Aloo Methi",
  "Aloo Pyaz",
  "Aloo Zeera",
  "Aloo Rasedar",
  "Aloo Hari Mirch",
  "Aloo Adraki",

  "Bhindi Masala",
  "Bhindi Do Pyaza",
  "Bhindi Salan",
  "Bhindi Fry",
  "Bhindi Tomato",

  "Baingan Bharta",
  "Baingan Masala",
  "Baingan Ka Salan",
  "Bharwa Baingan",
  "Baingan Fry",
  "Baingan Tamatar",

  "Mix Vegetable Curry",
  "Vegetable Jalfrezi",
  "Tava Vegetable",
  "Kadai Vegetable",

  "Matar Paneer",
  "Shimla Mirch Masala",
  "Lauki Chana Dal",
  "Tori Ki Sabzi",
  "Karela Fry",
  "Ghia Rasedar",
  "Palak Dal",
  "Chana Masala",
  "Rajma",
  "Vegetable Pulao"
];

async function deleteVegRecipes() {
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

    for (let title of vegRecipesToDelete) {
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

deleteVegRecipes();