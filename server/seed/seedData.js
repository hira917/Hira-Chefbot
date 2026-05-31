const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const dotenv = require('dotenv');

// ✅ YEH LINE IMPORTANT HAI - .env file ka sahi path
dotenv.config({ path: __dirname + '/../.env' });

// ✅ Debug: Check if MONGO_URI is loaded
console.log('📡 Checking .env file...');
console.log('🔗 MONGO_URI exists?', process.env.MONGO_URI ? '✅ YES' : '❌ NO');

const recipes = [
  // ... aap ki saari recipes yahan paste karein
];

const seedDatabase = async () => {
  try {
    // ✅ Check if MONGO_URI is available
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI is not defined in .env file');
      console.error('Current directory:', __dirname);
      console.error('Please check .env file exists at: D:\\server\\.env');
      process.exit(1);
    }
    
    console.log('📡 Connecting to MongoDB Atlas...');
    console.log('🔗 URI:', process.env.MONGO_URI.replace(/chefbot123/, '******')); // Hide password
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas successfully!');
    
    // Delete existing recipes
    const deleted = await Recipe.deleteMany({});
    console.log(`🗑️ Deleted ${deleted.deletedCount} existing recipes`);
    
    // Insert new recipes
    const inserted = await Recipe.insertMany(recipes);
    console.log(`✅ Inserted ${inserted.length} recipes successfully!`);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();