import React, { useState, useEffect, useRef } from 'react';
import './ChineseCuisine.css';

const ChineseCuisine = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pantryItems, setPantryItems] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const speechSynthesisRef = useRef(null);

  // Chinese Cuisine images
  const chineseImages = [
    // Chicken Dishes (6)
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500", // Kung Pao Chicken
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500", // General Tso's Chicken
    "https://images.unsplash.com/photo-1586195611298-6c3c9c5c4d4c?w=500", // Lemon Chicken
    "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=500", // Szechuan Chicken
    "https://images.unsplash.com/photo-1604908176997-125f25c813e5?w=500", // Ginger Chicken
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500", // Cashew Chicken
    
    // Beef Dishes (5)
    "https://images.unsplash.com/photo-1586195611298-6c3c9c5c4d4c?w=500", // Mongolian Beef
    "https://images.unsplash.com/photo-1604908176997-125f25c813e5?w=500", // Beef with Broccoli
    "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=500", // Szechuan Beef
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500", // Pepper Steak
    "https://images.unsplash.com/photo-1586195611298-6c3c9c5c4d4c?w=500", // Orange Beef
    
    // Pork Dishes (5)
    "https://images.unsplash.com/photo-1604908176997-125f25c813e5?w=500", // Sweet and Sour Pork
    "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=500", // Char Siu
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500", // Twice Cooked Pork
    "https://images.unsplash.com/photo-1586195611298-6c3c9c5c4d4c?w=500", // Mu Shu Pork
    "https://images.unsplash.com/photo-1604908176997-125f25c813e5?w=500", // Pork Fried Rice
    
    // Noodle Dishes (5)
    "https://images.unsplash.com/photo-1555126634-3234a59d3d26?w=500", // Chow Mein
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500", // Lo Mein
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500", // Pad Thai
    "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500", // Dan Dan Noodles
    "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500", // Singapore Noodles
    
    // Rice Dishes (4)
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500", // Fried Rice
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500", // Yang Chow Fried Rice
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500", // Nasi Goreng
    "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500", // Clay Pot Rice
    
    // Dim Sum & Dumplings (5)
    "https://images.unsplash.com/photo-1541696432-82c6f8b8e8b8?w=500", // Dumplings
    "https://images.unsplash.com/photo-1541696432-82c6f8b8e8b8?w=500", // Spring Rolls
    "https://images.unsplash.com/photo-1541696432-82c6f8b8e8b8?w=500", // Siu Mai
    "https://images.unsplash.com/photo-1541696432-82c6f8b8e8b8?w=500", // Har Gow
    "https://images.unsplash.com/photo-1541696432-82c6f8b8e8b8?w=500", // Pot Stickers
  ];

  // Complete Chinese Cuisine Recipes (30 items - all main courses)
  const chineseRecipes = [
    // ========== CHICKEN DISHES (6) ==========
    { 
      id: 1, 
      name: "Kung Pao Chicken",
      tagline: "Spicy stir-fry with peanuts and vegetables",
      image: chineseImages[0],
      pantryKeywords: ["chicken", "peanuts", "soy sauce", "chili"],
      ingredients: [
        "500g chicken breast, cubed",
        "½ cup peanuts",
        "2 tablespoons oil",
        "For marinade:",
        "1 tablespoon soy sauce",
        "1 tablespoon cornstarch",
        "1 teaspoon sesame oil",
        "For sauce:",
        "2 tablespoons soy sauce",
        "1 tablespoon black vinegar",
        "1 tablespoon sugar",
        "1 teaspoon cornstarch",
        "½ cup chicken broth",
        "4 dried red chilies",
        "1 teaspoon Szechuan peppercorns",
        "3 cloves garlic",
        "1 teaspoon ginger",
        "2 spring onions"
      ],
      steps: [
        "Marinate chicken with soy sauce, cornstarch, sesame oil for 15 minutes.",
        "Mix sauce ingredients in a bowl.",
        "Heat wok, add oil, toast peanuts until golden, remove.",
        "Stir-fry chicken until golden, remove.",
        "Add chilies and peppercorns, toast briefly.",
        "Add garlic and ginger, stir-fry for 30 seconds.",
        "Return chicken to wok, add sauce, stir until thickened.",
        "Add peanuts and spring onions, toss.",
        "Serve hot with steamed rice."
      ]
    },
    { 
      id: 2, 
      name: "General Tso's Chicken",
      tagline: "Sweet and spicy deep-fried chicken",
      image: chineseImages[1],
      pantryKeywords: ["chicken", "soy sauce", "chili", "ginger"],
      ingredients: [
        "500g chicken thigh, cubed",
        "2 eggs, beaten",
        "1 cup cornstarch",
        "Oil for frying",
        "For sauce:",
        "3 tablespoons soy sauce",
        "2 tablespoons rice vinegar",
        "3 tablespoons sugar",
        "1 tablespoon hoisin sauce",
        "1 teaspoon sesame oil",
        "1 cup chicken broth",
        "1 tablespoon cornstarch",
        "4 dried red chilies",
        "3 cloves garlic",
        "1 tablespoon ginger",
        "Spring onions for garnish"
      ],
      steps: [
        "Dip chicken in egg, then coat with cornstarch.",
        "Heat oil, deep fry chicken until golden and crispy.",
        "Mix all sauce ingredients except chilies, garlic, ginger.",
        "Heat 2 tablespoons oil in wok, add chilies, garlic, ginger.",
        "Stir-fry for 30 seconds, add sauce mixture.",
        "Cook until sauce thickens.",
        "Add fried chicken, toss to coat.",
        "Garnish with spring onions.",
        "Serve immediately."
      ]
    },
    { 
      id: 3, 
      name: "Lemon Chicken",
      tagline: "Crispy chicken in tangy lemon sauce",
      image: chineseImages[2],
      pantryKeywords: ["chicken", "lemon", "soy sauce", "sugar"],
      ingredients: [
        "500g chicken breast, sliced",
        "2 eggs, beaten",
        "1 cup cornstarch",
        "Oil for frying",
        "For sauce:",
        "½ cup lemon juice",
        "¼ cup sugar",
        "2 tablespoons soy sauce",
        "1 cup chicken broth",
        "1 tablespoon cornstarch",
        "2 teaspoons lemon zest",
        "Salt to taste",
        "Lemon slices for garnish"
      ],
      steps: [
        "Dip chicken in egg, coat with cornstarch.",
        "Heat oil, deep fry chicken until golden.",
        "Mix lemon juice, sugar, soy sauce, broth, cornstarch.",
        "Pour sauce into pan, cook until thickened.",
        "Add lemon zest, season with salt.",
        "Add fried chicken to sauce, toss to coat.",
        "Garnish with lemon slices.",
        "Serve with steamed rice."
      ]
    },
    { 
      id: 4, 
      name: "Szechuan Chicken",
      tagline: "Spicy and numbing Szechuan style chicken",
      image: chineseImages[3],
      pantryKeywords: ["chicken", "chili", "peppercorns", "soy sauce"],
      ingredients: [
        "500g chicken breast, sliced",
        "2 tablespoons oil",
        "For marinade:",
        "1 tablespoon soy sauce",
        "1 tablespoon shaoxing wine",
        "1 teaspoon cornstarch",
        "For sauce:",
        "2 tablespoons soy sauce",
        "1 tablespoon black vinegar",
        "1 teaspoon sugar",
        "½ cup chicken broth",
        "1 tablespoon chili bean paste",
        "1 teaspoon Szechuan peppercorns",
        "4 dried red chilies",
        "3 cloves garlic",
        "1 tablespoon ginger",
        "2 spring onions",
        "1 teaspoon chili oil"
      ],
      steps: [
        "Marinate chicken with soy sauce, wine, cornstarch for 15 minutes.",
        "Heat wok, add oil, stir-fry chicken until cooked, remove.",
        "Add peppercorns and chilies, toast briefly.",
        "Add garlic and ginger, stir-fry.",
        "Add chili bean paste, stir-fry until fragrant.",
        "Return chicken, add sauce ingredients.",
        "Stir-fry until sauce coats chicken.",
        "Drizzle chili oil, garnish with spring onions.",
        "Serve hot."
      ]
    },
    { 
      id: 5, 
      name: "Ginger Chicken",
      tagline: "Stir-fried chicken with fresh ginger",
      image: chineseImages[4],
      pantryKeywords: ["chicken", "ginger", "soy sauce", "spring onion"],
      ingredients: [
        "500g chicken breast, sliced",
        "4 tablespoons ginger, julienned",
        "2 tablespoons oil",
        "For marinade:",
        "1 tablespoon soy sauce",
        "1 tablespoon shaoxing wine",
        "1 teaspoon cornstarch",
        "For sauce:",
        "2 tablespoons soy sauce",
        "1 tablespoon oyster sauce",
        "1 teaspoon sugar",
        "¼ cup chicken broth",
        "2 spring onions, cut into 2-inch pieces"
      ],
      steps: [
        "Marinate chicken with soy sauce, wine, cornstarch for 15 minutes.",
        "Heat wok, add oil, stir-fry chicken until golden, remove.",
        "Add half the ginger, stir-fry until fragrant.",
        "Return chicken to wok.",
        "Add sauce ingredients, stir-fry until thickened.",
        "Add remaining ginger and spring onions.",
        "Toss well, serve hot."
      ]
    },
    { 
      id: 6, 
      name: "Cashew Chicken",
      tagline: "Stir-fried chicken with crunchy cashews",
      image: chineseImages[5],
      pantryKeywords: ["chicken", "cashews", "soy sauce", "oyster sauce"],
      ingredients: [
        "500g chicken breast, cubed",
        "1 cup cashews",
        "1 bell pepper, diced",
        "1 onion, diced",
        "2 tablespoons oil",
        "For marinade:",
        "1 tablespoon soy sauce",
        "1 teaspoon cornstarch",
        "1 teaspoon sesame oil",
        "For sauce:",
        "2 tablespoons oyster sauce",
        "1 tablespoon soy sauce",
        "1 teaspoon sugar",
        "¼ cup chicken broth",
        "2 cloves garlic",
        "1 teaspoon ginger"
      ],
      steps: [
        "Marinate chicken with soy sauce, cornstarch, sesame oil.",
        "Toast cashews in dry wok until golden, remove.",
        "Heat oil, stir-fry chicken until cooked, remove.",
        "Stir-fry garlic, ginger, onion, bell pepper.",
        "Return chicken, add sauce, stir until thickened.",
        "Add cashews, toss well.",
        "Serve hot with rice."
      ]
    },

    // ========== BEEF DISHES (5) ==========
    { 
      id: 7, 
      name: "Mongolian Beef",
      tagline: "Sweet and savory stir-fried beef",
      image: chineseImages[6],
      pantryKeywords: ["beef", "soy sauce", "brown sugar", "ginger"],
      ingredients: [
        "500g flank steak, thinly sliced",
        "¼ cup cornstarch",
        "Oil for frying",
        "For sauce:",
        "½ cup soy sauce",
        "½ cup brown sugar",
        "½ cup water",
        "2 tablespoons oil",
        "4 cloves garlic",
        "1 tablespoon ginger",
        "4 spring onions, cut into 2-inch pieces"
      ],
      steps: [
        "Coat beef with cornstarch, shake off excess.",
        "Heat oil, fry beef in batches until crispy, remove.",
        "Mix soy sauce, brown sugar, water in a bowl.",
        "Heat 2 tablespoons oil in wok, add garlic and ginger.",
        "Stir-fry for 30 seconds, add sauce mixture.",
        "Cook until sauce thickens slightly.",
        "Add beef and spring onions, toss to coat.",
        "Serve immediately."
      ]
    },
    { 
      id: 8, 
      name: "Beef with Broccoli",
      tagline: "Classic stir-fry with tender beef and broccoli",
      image: chineseImages[7],
      pantryKeywords: ["beef", "broccoli", "soy sauce", "oyster sauce"],
      ingredients: [
        "500g flank steak, sliced",
        "2 heads broccoli, cut into florets",
        "3 cloves garlic",
        "1 tablespoon ginger",
        "For marinade:",
        "2 tablespoons soy sauce",
        "1 tablespoon cornstarch",
        "1 teaspoon sesame oil",
        "For sauce:",
        "¼ cup oyster sauce",
        "2 tablespoons soy sauce",
        "1 tablespoon shaoxing wine",
        "1 teaspoon sugar",
        "½ cup beef broth",
        "1 tablespoon cornstarch"
      ],
      steps: [
        "Marinate beef with soy sauce, cornstarch, sesame oil.",
        "Blanch broccoli in boiling water for 1 minute, drain.",
        "Mix sauce ingredients in a bowl.",
        "Heat oil in wok, stir-fry beef until browned, remove.",
        "Add garlic and ginger, stir-fry.",
        "Add broccoli, stir-fry for 1 minute.",
        "Return beef to wok, add sauce.",
        "Stir until sauce thickens and coats everything.",
        "Serve hot."
      ]
    },
    { 
      id: 9, 
      name: "Szechuan Beef",
      tagline: "Spicy beef with Szechuan peppercorns",
      image: chineseImages[8],
      pantryKeywords: ["beef", "chili", "peppercorns", "soy sauce"],
      ingredients: [
        "500g flank steak, sliced",
        "2 tablespoons oil",
        "For marinade:",
        "1 tablespoon soy sauce",
        "1 tablespoon shaoxing wine",
        "1 teaspoon cornstarch",
        "For sauce:",
        "2 tablespoons soy sauce",
        "1 tablespoon black vinegar",
        "1 teaspoon sugar",
        "½ cup beef broth",
        "1 tablespoon chili bean paste",
        "1 teaspoon Szechuan peppercorns",
        "4 dried red chilies",
        "3 cloves garlic",
        "1 tablespoon ginger",
        "2 spring onions",
        "1 bell pepper, sliced"
      ],
      steps: [
        "Marinate beef with soy sauce, wine, cornstarch.",
        "Heat wok, add oil, stir-fry beef until browned, remove.",
        "Add peppercorns and chilies, toast briefly.",
        "Add garlic, ginger, bell pepper, stir-fry.",
        "Add chili bean paste, stir-fry until fragrant.",
        "Return beef, add sauce ingredients.",
        "Stir-fry until sauce coats beef.",
        "Garnish with spring onions, serve."
      ]
    },
    { 
      id: 10, 
      name: "Pepper Steak",
      tagline: "Tender steak with bell peppers in savory sauce",
      image: chineseImages[9],
      pantryKeywords: ["beef", "bell pepper", "onion", "soy sauce"],
      ingredients: [
        "500g sirloin steak, sliced",
        "2 bell peppers (red and green), sliced",
        "1 onion, sliced",
        "3 cloves garlic",
        "For marinade:",
        "2 tablespoons soy sauce",
        "1 tablespoon cornstarch",
        "1 teaspoon sesame oil",
        "For sauce:",
        "¼ cup soy sauce",
        "2 tablespoons oyster sauce",
        "1 tablespoon shaoxing wine",
        "1 teaspoon black pepper",
        "½ cup beef broth",
        "1 teaspoon sugar"
      ],
      steps: [
        "Marinate beef with soy sauce, cornstarch, sesame oil.",
        "Heat oil in wok, stir-fry beef until browned, remove.",
        "Stir-fry garlic, onion, and bell peppers until tender-crisp.",
        "Mix sauce ingredients in a bowl.",
        "Return beef to wok, add sauce.",
        "Stir-fry until sauce thickens and coats everything.",
        "Serve hot with rice."
      ]
    },
    { 
      id: 11, 
      name: "Orange Beef",
      tagline: "Crispy beef in tangy orange sauce",
      image: chineseImages[10],
      pantryKeywords: ["beef", "orange", "soy sauce", "chili"],
      ingredients: [
        "500g flank steak, sliced",
        "¼ cup cornstarch",
        "Oil for frying",
        "For sauce:",
        "½ cup orange juice",
        "2 tablespoons orange zest",
        "¼ cup soy sauce",
        "¼ cup brown sugar",
        "2 tablespoons rice vinegar",
        "1 tablespoon chili paste",
        "1 cup chicken broth",
        "2 tablespoons cornstarch",
        "3 cloves garlic",
        "1 tablespoon ginger",
        "4 dried red chilies"
      ],
      steps: [
        "Coat beef with cornstarch, shake off excess.",
        "Heat oil, fry beef until crispy, remove.",
        "Mix orange juice, zest, soy sauce, sugar, vinegar, chili paste, broth, cornstarch.",
        "Heat 2 tablespoons oil in wok, add garlic, ginger, chilies.",
        "Stir-fry for 30 seconds, add sauce mixture.",
        "Cook until sauce thickens.",
        "Add beef, toss to coat.",
        "Serve immediately."
      ]
    },

    // ========== PORK DISHES (5) ==========
    { 
      id: 12, 
      name: "Sweet and Sour Pork",
      tagline: "Deep-fried pork with tangy sauce",
      image: chineseImages[11],
      pantryKeywords: ["pork", "pineapple", "bell pepper", "vinegar"],
      ingredients: [
        "500g pork shoulder, cubed",
        "1 egg, beaten",
        "½ cup cornstarch",
        "Oil for frying",
        "1 bell pepper, cubed",
        "1 onion, cubed",
        "1 cup pineapple chunks",
        "For sauce:",
        "½ cup ketchup",
        "¼ cup rice vinegar",
        "¼ cup brown sugar",
        "2 tablespoons soy sauce",
        "½ cup pineapple juice",
        "1 tablespoon cornstarch"
      ],
      steps: [
        "Dip pork in egg, coat with cornstarch.",
        "Heat oil, deep fry pork until golden and cooked through.",
        "Heat 2 tablespoons oil in wok, stir-fry onion and bell pepper.",
        "Add pineapple, stir-fry briefly.",
        "Mix all sauce ingredients, add to wok.",
        "Cook until sauce thickens.",
        "Add fried pork, toss to coat.",
        "Serve hot with rice."
      ]
    },
    { 
      id: 13, 
      name: "Char Siu (Chinese BBQ Pork)",
      tagline: "Sweet and savory roasted pork",
      image: chineseImages[12],
      pantryKeywords: ["pork", "hoisin", "soy sauce", "honey"],
      ingredients: [
        "1 kg pork shoulder, cut into strips",
        "For marinade:",
        "3 tablespoons hoisin sauce",
        "2 tablespoons soy sauce",
        "2 tablespoons honey",
        "2 tablespoons brown sugar",
        "1 tablespoon shaoxing wine",
        "1 teaspoon five spice powder",
        "1 tablespoon sesame oil",
        "3 cloves garlic, minced",
        "1 teaspoon ginger",
        "Red food coloring (optional)"
      ],
      steps: [
        "Mix all marinade ingredients in a bowl.",
        "Add pork, coat well, marinate overnight.",
        "Preheat oven to 180°C (350°F).",
        "Place pork on rack over baking tray.",
        "Roast for 30 minutes, basting with marinade.",
        "Increase heat to 200°C, roast 15 more minutes.",
        "Brush with honey, roast 5 minutes until charred.",
        "Let rest, slice thinly.",
        "Serve with rice or noodles."
      ]
    },
    { 
      id: 14, 
      name: "Twice Cooked Pork",
      tagline: "Sichuan-style pork belly with leeks",
      image: chineseImages[13],
      pantryKeywords: ["pork belly", "leek", "chili bean paste", "soy sauce"],
      ingredients: [
        "500g pork belly",
        "2 leeks, cut into 2-inch pieces",
        "2 tablespoons oil",
        "2 tablespoons chili bean paste",
        "1 tablespoon black beans, fermented",
        "1 tablespoon soy sauce",
        "1 teaspoon sugar",
        "3 cloves garlic",
        "1 tablespoon ginger",
        "1 teaspoon Szechuan peppercorns"
      ],
      steps: [
        "Boil pork belly for 20 minutes until cooked through.",
        "Cool, then slice thinly.",
        "Heat oil in wok, add pork slices, fry until golden and curled.",
        "Remove pork, leave oil in wok.",
        "Add chili bean paste and black beans, stir-fry until fragrant.",
        "Add garlic, ginger, peppercorns, stir-fry.",
        "Return pork, add soy sauce and sugar.",
        "Add leeks, stir-fry for 2 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 15, 
      name: "Mu Shu Pork",
      tagline: "Stir-fried pork with vegetables, served with pancakes",
      image: chineseImages[14],
      pantryKeywords: ["pork", "eggs", "mushrooms", "hoisin"],
      ingredients: [
        "300g pork tenderloin, julienned",
        "3 eggs, beaten",
        "1 cup cabbage, shredded",
        "½ cup wood ear mushrooms, soaked and sliced",
        "2 spring onions, sliced",
        "For marinade:",
        "1 tablespoon soy sauce",
        "1 teaspoon cornstarch",
        "1 teaspoon sesame oil",
        "For sauce:",
        "2 tablespoons soy sauce",
        "1 tablespoon shaoxing wine",
        "1 teaspoon sugar",
        "1 teaspoon sesame oil",
        "For serving: Mandarin pancakes, hoisin sauce"
      ],
      steps: [
        "Marinate pork with soy sauce, cornstarch, sesame oil.",
        "Scramble eggs, remove from wok.",
        "Stir-fry pork until cooked, remove.",
        "Stir-fry cabbage and mushrooms until tender.",
        "Return pork and eggs to wok.",
        "Add sauce ingredients, stir-fry until combined.",
        "Add spring onions, toss.",
        "Serve with warm pancakes and hoisin sauce."
      ]
    },
    { 
      id: 16, 
      name: "Pork Fried Rice",
      tagline: "Classic fried rice with pork and vegetables",
      image: chineseImages[15],
      pantryKeywords: ["rice", "pork", "eggs", "soy sauce"],
      ingredients: [
        "4 cups cooked rice (day-old preferred)",
        "300g pork, diced",
        "2 eggs, beaten",
        "1 cup mixed vegetables (peas, carrots, corn)",
        "2 spring onions, sliced",
        "3 cloves garlic",
        "3 tablespoons soy sauce",
        "1 tablespoon oyster sauce",
        "1 teaspoon sesame oil",
        "2 tablespoons oil",
        "Salt and pepper"
      ],
      steps: [
        "Heat oil in wok, scramble eggs, remove.",
        "Stir-fry pork until cooked, remove.",
        "Add more oil, stir-fry garlic until fragrant.",
        "Add vegetables, stir-fry for 2 minutes.",
        "Add rice, break up clumps, stir-fry.",
        "Add soy sauce, oyster sauce, sesame oil.",
        "Return pork and eggs, toss well.",
        "Add spring onions, stir-fry for 1 minute.",
        "Serve hot."
      ]
    },

    // ========== NOODLE DISHES (5) ==========
    { 
      id: 17, 
      name: "Chow Mein",
      tagline: "Stir-fried noodles with vegetables and meat",
      image: chineseImages[16],
      pantryKeywords: ["noodles", "chicken", "cabbage", "soy sauce"],
      ingredients: [
        "500g fresh egg noodles",
        "300g chicken, sliced",
        "2 cups cabbage, shredded",
        "1 carrot, julienned",
        "1 bell pepper, sliced",
        "2 spring onions, sliced",
        "3 cloves garlic",
        "For sauce:",
        "3 tablespoons soy sauce",
        "1 tablespoon oyster sauce",
        "1 teaspoon sesame oil",
        "1 teaspoon sugar",
        "¼ cup chicken broth"
      ],
      steps: [
        "Boil noodles according to package, drain.",
        "Heat oil in wok, stir-fry chicken until cooked, remove.",
        "Stir-fry garlic, then add vegetables, stir-fry until tender-crisp.",
        "Add noodles and sauce, toss well.",
        "Return chicken to wok, toss everything together.",
        "Add spring onions, stir-fry for 1 minute.",
        "Serve hot."
      ]
    },
    { 
      id: 18, 
      name: "Lo Mein",
      tagline: "Soft noodles in savory sauce",
      image: chineseImages[17],
      pantryKeywords: ["noodles", "pork", "mushrooms", "soy sauce"],
      ingredients: [
        "500g fresh lo mein noodles",
        "300g pork, sliced",
        "1 cup shiitake mushrooms, sliced",
        "1 carrot, julienned",
        "1 cup bok choy",
        "2 spring onions",
        "3 cloves garlic",
        "For sauce:",
        "¼ cup soy sauce",
        "2 tablespoons oyster sauce",
        "1 tablespoon dark soy sauce",
        "1 teaspoon sesame oil",
        "1 teaspoon sugar",
        "½ cup chicken broth"
      ],
      steps: [
        "Boil noodles until tender, drain.",
        "Heat oil in wok, stir-fry pork until cooked, remove.",
        "Stir-fry garlic, mushrooms, carrot until tender.",
        "Add bok choy, stir-fry for 1 minute.",
        "Add noodles and sauce, toss well.",
        "Return pork to wok, toss everything.",
        "Add spring onions, serve hot."
      ]
    },
    { 
      id: 19, 
      name: "Pad Thai",
      tagline: "Thai-style stir-fried rice noodles",
      image: chineseImages[18],
      pantryKeywords: ["rice noodles", "shrimp", "tofu", "eggs"],
      ingredients: [
        "400g rice noodles",
        "200g shrimp, peeled",
        "200g firm tofu, cubed",
        "2 eggs",
        "1 cup bean sprouts",
        "3 spring onions",
        "½ cup peanuts, crushed",
        "Lime wedges",
        "For sauce:",
        "3 tablespoons fish sauce",
        "3 tablespoons tamarind paste",
        "2 tablespoons brown sugar",
        "1 tablespoon rice vinegar",
        "1 teaspoon chili flakes"
      ],
      steps: [
        "Soak noodles in warm water until soft, drain.",
        "Mix all sauce ingredients in a bowl.",
        "Heat oil in wok, stir-fry tofu until golden, remove.",
        "Stir-fry shrimp until pink, remove.",
        "Scramble eggs in wok, add noodles and sauce.",
        "Toss well, add tofu and shrimp.",
        "Add bean sprouts and spring onions, toss.",
        "Serve with peanuts and lime wedges."
      ]
    },
    { 
      id: 20, 
      name: "Dan Dan Noodles",
      tagline: "Spicy Szechuan noodles with pork",
      image: chineseImages[19],
      pantryKeywords: ["noodles", "pork mince", "chili oil", "peanuts"],
      ingredients: [
        "400g fresh noodles",
        "300g pork mince",
        "2 tablespoons oil",
        "For sauce:",
        "3 tablespoons sesame paste",
        "2 tablespoons soy sauce",
        "2 tablespoons black vinegar",
        "1 tablespoon chili oil",
        "1 teaspoon Szechuan peppercorns",
        "½ cup chicken broth",
        "2 spring onions",
        "¼ cup peanuts, crushed"
      ],
      steps: [
        "Cook noodles according to package, drain.",
        "Heat oil in wok, stir-fry pork until crispy.",
        "Mix all sauce ingredients in a bowl.",
        "Divide sauce among serving bowls.",
        "Add noodles to bowls, top with pork.",
        "Garnish with spring onions and peanuts.",
        "Mix well before eating."
      ]
    },
    { 
      id: 21, 
      name: "Singapore Noodles",
      tagline: "Curry-flavored rice noodles with shrimp and pork",
      image: chineseImages[20],
      pantryKeywords: ["rice noodles", "shrimp", "pork", "curry powder"],
      ingredients: [
        "400g rice vermicelli",
        "200g shrimp",
        "200g pork, sliced",
        "2 eggs, beaten",
        "1 onion, sliced",
        "1 bell pepper, sliced",
        "2 spring onions",
        "For seasoning:",
        "2 tablespoons curry powder",
        "2 tablespoons soy sauce",
        "1 tablespoon shaoxing wine",
        "1 teaspoon sugar",
        "1 teaspoon sesame oil"
      ],
      steps: [
        "Soak noodles in warm water until soft, drain.",
        "Heat oil in wok, scramble eggs, remove.",
        "Stir-fry shrimp and pork until cooked, remove.",
        "Stir-fry onion and bell pepper until tender.",
        "Add noodles, curry powder, soy sauce, wine, sugar.",
        "Toss well until noodles are coated.",
        "Return shrimp, pork, eggs to wok.",
        "Add spring onions and sesame oil, toss.",
        "Serve hot."
      ]
    },

    // ========== RICE DISHES (4) ==========
    { 
      id: 22, 
      name: "Fried Rice",
      tagline: "Classic Chinese fried rice",
      image: chineseImages[21],
      pantryKeywords: ["rice", "eggs", "peas", "soy sauce"],
      ingredients: [
        "4 cups cooked rice (day-old)",
        "2 eggs, beaten",
        "1 cup mixed vegetables (peas, carrots, corn)",
        "200g ham or char siu, diced",
        "2 spring onions",
        "3 cloves garlic",
        "3 tablespoons soy sauce",
        "1 tablespoon oyster sauce",
        "1 teaspoon sesame oil",
        "2 tablespoons oil"
      ],
      steps: [
        "Heat oil in wok, scramble eggs, remove.",
        "Stir-fry garlic until fragrant.",
        "Add vegetables and ham, stir-fry for 2 minutes.",
        "Add rice, break up clumps, stir-fry.",
        "Add soy sauce and oyster sauce, toss well.",
        "Return eggs, add spring onions and sesame oil.",
        "Toss everything together, serve hot."
      ]
    },
    { 
      id: 23, 
      name: "Yang Chow Fried Rice",
      tagline: "Special fried rice with BBQ pork and shrimp",
      image: chineseImages[22],
      pantryKeywords: ["rice", "shrimp", "bbq pork", "eggs"],
      ingredients: [
        "4 cups cooked rice",
        "200g shrimp",
        "200g char siu, diced",
        "2 eggs, beaten",
        "1 cup peas and carrots",
        "2 spring onions",
        "3 cloves garlic",
        "3 tablespoons soy sauce",
        "1 tablespoon oyster sauce",
        "1 teaspoon sesame oil",
        "2 tablespoons oil"
      ],
      steps: [
        "Heat oil in wok, scramble eggs, remove.",
        "Stir-fry shrimp until pink, remove.",
        "Stir-fry garlic, char siu, vegetables.",
        "Add rice, stir-fry, breaking up clumps.",
        "Add soy sauce and oyster sauce, toss.",
        "Return shrimp and eggs, add spring onions.",
        "Drizzle sesame oil, toss well, serve."
      ]
    },
    { 
      id: 24, 
      name: "Nasi Goreng",
      tagline: "Indonesian-style fried rice",
      image: chineseImages[23],
      pantryKeywords: ["rice", "chicken", "shrimp", "sambal"],
      ingredients: [
        "4 cups cooked rice",
        "200g chicken, diced",
        "100g shrimp",
        "2 eggs, fried sunny side up",
        "2 tablespoons sambal oelek",
        "2 tablespoons sweet soy sauce",
        "3 cloves garlic",
        "1 onion, diced",
        "2 spring onions",
        "Shallot crisps for garnish"
      ],
      steps: [
        "Heat oil in wok, stir-fry chicken and shrimp until cooked, remove.",
        "Stir-fry garlic and onion until soft.",
        "Add sambal, stir-fry for 1 minute.",
        "Add rice and sweet soy sauce, stir-fry well.",
        "Return chicken and shrimp, toss.",
        "Add spring onions, serve with fried egg on top.",
        "Garnish with shallot crisps."
      ]
    },
    { 
      id: 25, 
      name: "Clay Pot Rice",
      tagline: "Rice cooked in clay pot with Chinese sausage",
      image: chineseImages[24],
      pantryKeywords: ["rice", "chinese sausage", "chicken", "mushrooms"],
      ingredients: [
        "2 cups jasmine rice",
        "2 cups water",
        "2 Chinese sausages, sliced",
        "200g chicken thighs, diced",
        "4 shiitake mushrooms, sliced",
        "1 tablespoon ginger, julienned",
        "For sauce:",
        "2 tablespoons soy sauce",
        "1 tablespoon dark soy sauce",
        "1 tablespoon oyster sauce",
        "1 teaspoon sugar",
        "1 teaspoon sesame oil"
      ],
      steps: [
        "Wash rice, place in clay pot with water.",
        "Bring to boil, then reduce heat to low, cover.",
        "After 10 minutes, arrange sausages, chicken, mushrooms, ginger on top.",
        "Cover and cook for 15 more minutes.",
        "Mix sauce ingredients in a small bowl.",
        "Drizzle sauce over rice and meat.",
        "Cook for 5 more minutes until crispy bottom forms.",
        "Let rest for 5 minutes before serving."
      ]
    },

    // ========== DIM SUM & DUMPLINGS (5) ==========
    { 
      id: 26, 
      name: "Pork Dumplings",
      tagline: "Juicy steamed or fried dumplings",
      image: chineseImages[25],
      pantryKeywords: ["dumpling wrappers", "pork mince", "ginger", "soy sauce"],
      ingredients: [
        "30 dumpling wrappers",
        "300g pork mince",
        "200g shrimp, minced",
        "2 spring onions, finely chopped",
        "2 tablespoons ginger, minced",
        "2 tablespoons soy sauce",
        "1 tablespoon sesame oil",
        "1 tablespoon shaoxing wine",
        "1 teaspoon sugar",
        "½ teaspoon white pepper",
        "1 egg, beaten",
        "Oil for pan-frying"
      ],
      steps: [
        "Mix pork, shrimp, spring onions, ginger, soy sauce, sesame oil, wine, sugar, pepper.",
        "Add egg, mix well.",
        "Place 1 tablespoon filling in center of wrapper.",
        "Wet edges, fold and pleat to seal.",
        "For pan-fried: heat oil, fry dumplings until golden bottom.",
        "Add water, cover, steam for 8 minutes.",
        "Uncover, cook until water evaporates, bottoms crisp.",
        "Serve with soy sauce and black vinegar."
      ]
    },
    { 
      id: 27, 
      name: "Spring Rolls",
      tagline: "Crispy fried rolls with vegetable filling",
      image: chineseImages[26],
      pantryKeywords: ["spring roll wrappers", "cabbage", "carrot", "mushrooms"],
      ingredients: [
        "20 spring roll wrappers",
        "2 cups cabbage, shredded",
        "1 carrot, julienned",
        "1 cup bean sprouts",
        "4 shiitake mushrooms, sliced",
        "100g glass noodles, soaked and cut",
        "2 spring onions",
        "2 cloves garlic",
        "2 tablespoons soy sauce",
        "1 teaspoon sesame oil",
        "1 teaspoon sugar",
        "Oil for deep frying",
        "Flour paste for sealing"
      ],
      steps: [
        "Stir-fry garlic, add vegetables and mushrooms.",
        "Add glass noodles, soy sauce, sesame oil, sugar.",
        "Cook until vegetables are tender, cool filling.",
        "Place filling on wrapper, fold sides, roll tightly.",
        "Seal edge with flour paste.",
        "Heat oil, deep fry until golden and crispy.",
        "Drain on paper towels.",
        "Serve with sweet chili sauce."
      ]
    },
    { 
      id: 28, 
      name: "Siu Mai",
      tagline: "Open-topped pork and shrimp dumplings",
      image: chineseImages[27],
      pantryKeywords: ["wonton wrappers", "pork mince", "shrimp", "shiitake"],
      ingredients: [
        "30 round wonton wrappers",
        "300g pork mince",
        "200g shrimp, minced",
        "4 shiitake mushrooms, finely chopped",
        "2 spring onions",
        "1 tablespoon ginger",
        "2 tablespoons soy sauce",
        "1 tablespoon oyster sauce",
        "1 teaspoon sesame oil",
        "1 teaspoon sugar",
        "1 egg white",
        "Cornstarch for dusting"
      ],
      steps: [
        "Mix pork, shrimp, mushrooms, spring onions, ginger.",
        "Add soy sauce, oyster sauce, sesame oil, sugar, egg white.",
        "Mix well until sticky.",
        "Place wrapper in palm, add 1 tablespoon filling.",
        "Bring up sides, leaving top open, shape into cylinder.",
        "Tap on counter to flatten bottom.",
        "Steam for 8-10 minutes until cooked.",
        "Serve with soy sauce and chili oil."
      ]
    },
    { 
      id: 29, 
      name: "Har Gow",
      tagline: "Shrimp dumplings with translucent wrapper",
      image: chineseImages[28],
      pantryKeywords: ["wheat starch", "shrimp", "bamboo shoots"],
      ingredients: [
        "For dough:",
        "1 cup wheat starch",
        "¼ cup tapioca starch",
        "1 cup boiling water",
        "1 tablespoon oil",
        "For filling:",
        "300g shrimp, minced",
        "50g bamboo shoots, finely chopped",
        "1 teaspoon ginger",
        "1 teaspoon shaoxing wine",
        "1 teaspoon sesame oil",
        "½ teaspoon sugar",
        "Salt and white pepper"
      ],
      steps: [
        "Mix wheat starch and tapioca starch.",
        "Add boiling water, stir quickly, cover for 10 minutes.",
        "Knead with oil until smooth, rest 30 minutes.",
        "Mix filling ingredients, refrigerate.",
        "Roll dough into thin circles.",
        "Place filling in center, pleat to seal.",
        "Steam for 6-8 minutes until translucent.",
        "Serve immediately with soy sauce."
      ]
    },
    { 
      id: 30, 
      name: "Pot Stickers",
      tagline: "Pan-fried dumplings with crispy bottom",
      image: chineseImages[29],
      pantryKeywords: ["dumpling wrappers", "pork", "cabbage", "ginger"],
      ingredients: [
        "30 dumpling wrappers",
        "300g pork mince",
        "2 cups napa cabbage, finely chopped",
        "2 spring onions",
        "2 tablespoons ginger",
        "2 tablespoons soy sauce",
        "1 tablespoon sesame oil",
        "1 tablespoon shaoxing wine",
        "1 teaspoon sugar",
        "Salt and pepper",
        "Oil for frying"
      ],
      steps: [
        "Salt cabbage, let sit 15 minutes, squeeze out water.",
        "Mix pork with cabbage, spring onions, ginger.",
        "Add soy sauce, sesame oil, wine, sugar, salt, pepper.",
        "Place filling on wrapper, fold and pleat to seal.",
        "Heat oil in non-stick pan, arrange dumplings flat side down.",
        "Fry until bottoms are golden.",
        "Add ⅓ cup water, cover, steam for 8 minutes.",
        "Uncover, cook until water evaporates and bottoms crisp.",
        "Serve with dipping sauce."
      ]
    }
  ];

  // Load pantry items from localStorage
  useEffect(() => {
    const savedPantry = localStorage.getItem('pantryItems');
    if (savedPantry) {
      try {
        const parsed = JSON.parse(savedPantry);
        setPantryItems(parsed);
      } catch (e) {
        console.error("Error parsing pantry items", e);
      }
    }
  }, []);

  // Suggest 2 recipes based on pantry items
  useEffect(() => {
    if (pantryItems && pantryItems.length > 0) {
      const pantryLower = pantryItems.map(item => item.toLowerCase().trim());
      
      const scoredRecipes = chineseRecipes.map(recipe => {
        let score = 0;
        const matchedItems = [];
        
        pantryLower.forEach(pantryItem => {
          const keywordMatch = recipe.pantryKeywords.some(keyword => 
            keyword.toLowerCase() === pantryItem || 
            pantryItem.includes(keyword.toLowerCase())
          );
          
          const ingredientMatch = recipe.ingredients.some(ing => 
            ing.toLowerCase().includes(pantryItem)
          );
          
          if (keywordMatch || ingredientMatch) {
            score += 1;
            matchedItems.push(pantryItem);
          }
        });
        
        return { ...recipe, score, matchedItems };
      });
      
      const suggestions = scoredRecipes
        .filter(recipe => recipe.score >= 2)
        .sort((a, b) => b.score - a.score)
        .slice(0, 2);
      
      setSuggestedRecipes(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [pantryItems]);

  // Voice instructions handler
  const speakInstructions = (steps, stepIndex = 0) => {
    if ('speechSynthesis' in window) {
      if (speechSynthesisRef.current && isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setCurrentStep(0);
        setProgress(0);
        speechSynthesisRef.current = null;
        return;
      }

      if (stepIndex >= 0 && stepIndex < steps.length) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = steps[stepIndex];
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        setCurrentStep(stepIndex + 1);
        const stepProgress = ((stepIndex + 1) / steps.length) * 100;
        setProgress(stepProgress);
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => {
          setIsPlaying(false);
          speechSynthesisRef.current = null;
        };
        utterance.onerror = () => {
          setIsPlaying(false);
          speechSynthesisRef.current = null;
        };
        
        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentStep(0);
      setProgress(0);
      speechSynthesisRef.current = null;
    }
  };

  const speakNextStep = () => {
    if (selectedRecipe && currentStep < selectedRecipe.steps.length) {
      stopSpeaking();
      speakInstructions(selectedRecipe.steps, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedRecipe && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedRecipe.steps, currentStep - 2);
    }
  };

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedRecipe(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const applySuggestion = (recipe) => {
    handleRecipeSelect(recipe);
  };

  return (
    <div className="chinese-page">
      {/* Header */}
      <header className="chinese-header">
        <div className="chinese-header-content">
          <h1 className="chinese-page-title">Chinese Cuisine</h1>
          <p className="chinese-page-description">
            Wok-tossed perfection, savory & aromatic
          </p>
        </div>
      </header>

      {/* Pantry Suggestions - 2 Recipes */}
      {showSuggestions && (
        <div className="chinese-pantry-suggestions">
          <div className="chinese-suggestions-header">
            <i className="fas fa-lightbulb"></i>
            <h3>Based on your pantry, you can make:</h3>
          </div>
          <div className="chinese-suggestions-grid two-suggestions">
            {suggestedRecipes.map(recipe => (
              <div 
                key={`suggest-${recipe.id}`} 
                className="chinese-suggestion-card"
                onClick={() => applySuggestion(recipe)}
              >
                <div className="chinese-suggestion-image" style={{backgroundImage: `url(${recipe.image})`}}></div>
                <div className="chinese-suggestion-content">
                  <h4>{recipe.name}</h4>
                  <p>{recipe.tagline}</p>
                  <p className="chinese-match-info">✓ {recipe.score} items match your pantry</p>
                  <button className="chinese-suggestion-btn">Cook This</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipes Grid */}
      <main className="chinese-main">
        <div className="chinese-grid-section">
          <div className="chinese-grid">
            {chineseRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="chinese-technique-card"
                onClick={() => handleRecipeSelect(recipe)}
              >
                <div 
                  className="chinese-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                
                <div className="chinese-card-content">
                  <h3 className="chinese-card-title">{recipe.name}</h3>
                  <p className="chinese-card-description">{recipe.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {showDetailPanel && selectedRecipe && (
        <div className="chinese-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="chinese-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="chinese-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="chinese-modal-header">
              <div className="chinese-modal-title">
                <h2>{selectedRecipe.name}</h2>
                <p>{selectedRecipe.tagline}</p>
              </div>
            </div>

            <div className="chinese-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="chinese-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="chinese-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="chinese-ingredient-item">
                      <span className="chinese-ingredient-bullet">•</span>
                      <span className="chinese-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="chinese-modal-steps">
                <h3>Steps to Make</h3>
                <div className="chinese-steps-list">
                  {selectedRecipe.steps.map((step, idx) => (
                    <div key={idx} className="chinese-step-item">
                      <span className="chinese-step-number">{idx + 1}.</span>
                      <span className="chinese-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="chinese-modal-voice-container">
                <div className="voice-panel">
                  <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedRecipe.steps.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRecipe.steps, 0)}
                    >
                      <i className={`fas fa-${isPlaying ? 'stop' : 'play'}`}></i>
                      {isPlaying ? ' Stop' : ' Start Voice Guide'}
                    </button>

                    <div className="step-controls">
                      <button 
                        className="step-btn prev"
                        onClick={speakPreviousStep}
                        disabled={currentStep <= 1}
                      >
                        <i className="fas fa-backward"></i> Previous
                      </button>
                      <button 
                        className="step-btn next"
                        onClick={speakNextStep}
                        disabled={currentStep >= selectedRecipe.steps.length}
                      >
                        Next <i className="fas fa-forward"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChineseCuisine;