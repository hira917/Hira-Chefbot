const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config({ path: '../.env' });
console.log('=== DELETE SOUPS SCRIPT ===');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('=== END DEBUG ===');

const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

// List of soup titles to delete
const soupsToDelete = [
  "Cream of Mushroom Soup",
  "Creamy Noodles Soup",
  "Egg Drop Soup",
  "Chicken Macroni Corn Soup",
  "Chicken Soup",
  "Vegetable Hot and Sour Soup",
  "Chicken Broth",
  "Chicken Vegetable Soup",
  "Mulligatawny Soup",
  "Chicken Tikka Corn Soup",
  "Lentil Soup",
  "Tomato Chicken Macaroni Soup",
  "Barley Soup",
  "Chicken Potato Soup",
  "Hareesa Soup",
  "Cream of Chicken Soup",
  "Spinach Soup",
  "Restaurant Style Hot and Sour Soup",
  "Chicken Corn Soup",
  "Mixed Grain Soup",
  "Hot and Sour Chicken Macaroni Soup",
  "Herbal Soup",
  "Mutton Broth",
  "Pumpkin Soup",
  "Pot Pie Soup with Tender Pops",
  "Garlic Soup",
  "Manchow Soup With Crispy Noodles",
  "Oats Soup",
  "Creamy Chicken Macaroni Soup",
  "Paye Soup",
  "Tomato Soup",
  "Thai Soup",
  "Mixed Vegetable Soup",
  "Chicken Clear Soup",
  "Noodles Soup",
  "19B Soup",
  "Fish Vegetable and Noodle Soup"
];

async function deleteSoups() {
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

    for (let title of soupsToDelete) {
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

deleteSoups();