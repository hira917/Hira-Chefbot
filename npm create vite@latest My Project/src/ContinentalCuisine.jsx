import React, { useState, useEffect, useRef } from 'react';
import './ContinentalCuisine.css';

const ContinentalCuisine = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pantryItems, setPantryItems] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const speechSynthesisRef = useRef(null);

  // Continental Cuisine images
  const continentalImages = [
    // Appetizers (5)
    "https://images.unsplash.com/photo-1551024707-872f23a1934e?w=500", // Bruschetta
    "https://images.unsplash.com/photo-1541529086526-db283c563270?w=500", // Garlic Bread
    "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=500", // Stuffed Mushrooms
    "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500", // French Onion Soup
    "https://images.unsplash.com/photo-1586195611298-6c3c9c5c4d4c?w=500", // Caesar Salad
    
    // Main Courses - Chicken (6)
    "https://images.unsplash.com/photo-1604908176997-125f25c813e5?w=500", // Chicken Alfredo
    "https://images.unsplash.com/photo-1586195611298-6c3c9c5c4d4c?w=500", // Chicken Cordon Bleu
    "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=500", // Chicken Marsala
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500", // Chicken Parmesan
    "https://images.unsplash.com/photo-1604908176997-125f25c813e5?w=500", // Roasted Chicken
    "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=500", // Chicken Piccata
    
    // Main Courses - Beef (6)
    "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=500", // Beef Stroganoff
    "https://images.unsplash.com/photo-1558030006-450675393462?w=500", // Beef Wellington
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500", // Steak
    "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500", // Meatloaf
    "https://images.unsplash.com/photo-1586195611298-6c3c9c5c4d4c?w=500", // Pot Roast
    "https://images.unsplash.com/photo-1551024707-872f23a1934e?w=500", // Beef Bourguignon
    
    // Pasta (6)
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500", // Spaghetti Bolognese
    "https://images.unsplash.com/photo-1556760544-74068565f05c?w=500", // Lasagna
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500", // Fettuccine Alfredo
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500", // Mac & Cheese
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500", // Ravioli
    "https://images.unsplash.com/photo-1556760544-74068565f05c?w=500", // Pasta Carbonara
    
    // Fish & Seafood (5)
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500", // Grilled Salmon
    "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500", // Fish & Chips
    "https://images.unsplash.com/photo-1586195611298-6c3c9c5c4d4c?w=500", // Shrimp Scampi
    "https://images.unsplash.com/photo-1604908176997-125f25c813e5?w=500", // Lobster Thermidor
    "https://images.unsplash.com/photo-1551024707-872f23a1934e?w=500", // Seafood Paella
    
    // Additional Main Courses (2)
    "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=500", // Osso Buco
    "https://images.unsplash.com/photo-1558030006-450675393462?w=500", // Lamb Chops
  ];

  // Complete Continental Cuisine Recipes (30 items - all main courses)
  const continentalRecipes = [
    // ========== APPETIZERS (5) ==========
    { 
      id: 1, 
      name: "Bruschetta",
      tagline: "Toasted bread with fresh tomato and basil",
      image: continentalImages[0],
      pantryKeywords: ["bread", "tomato", "basil", "garlic", "olive oil"],
      ingredients: [
        "1 baguette, sliced diagonally",
        "4 ripe tomatoes, diced",
        "3 cloves garlic, minced",
        "¼ cup fresh basil, chopped",
        "¼ cup olive oil",
        "1 tablespoon balsamic vinegar",
        "Salt to taste",
        "Black pepper to taste"
      ],
      steps: [
        "Preheat oven to 180°C (350°F).",
        "Arrange bread slices on baking sheet, brush with olive oil.",
        "Toast for 5-7 minutes until golden.",
        "Rub each slice with raw garlic while hot.",
        "In a bowl, mix tomatoes, basil, olive oil, balsamic, salt, and pepper.",
        "Let tomato mixture sit for 10 minutes.",
        "Top toasted bread with tomato mixture.",
        "Serve immediately."
      ]
    },
    { 
      id: 2, 
      name: "Garlic Bread",
      tagline: "Crispy bread with garlic butter",
      image: continentalImages[1],
      pantryKeywords: ["bread", "butter", "garlic", "parsley"],
      ingredients: [
        "1 baguette or Italian bread",
        "½ cup unsalted butter, softened",
        "4 cloves garlic, minced",
        "2 tablespoons fresh parsley, chopped",
        "¼ teaspoon salt",
        "¼ cup grated Parmesan cheese"
      ],
      steps: [
        "Preheat oven to 180°C (350°F).",
        "In a bowl, mix softened butter with garlic, parsley, and salt.",
        "Slice bread diagonally without cutting through.",
        "Spread garlic butter between slices and on top.",
        "Wrap in foil and bake for 10 minutes.",
        "Open foil, sprinkle with Parmesan, bake 5 more minutes until crispy.",
        "Serve warm."
      ]
    },
    { 
      id: 3, 
      name: "Stuffed Mushrooms",
      tagline: "Mushrooms filled with cheesy herb stuffing",
      image: continentalImages[2],
      pantryKeywords: ["mushrooms", "cheese", "breadcrumbs", "garlic"],
      ingredients: [
        "20 large white mushrooms",
        "¼ cup cream cheese, softened",
        "¼ cup Parmesan cheese, grated",
        "2 tablespoons breadcrumbs",
        "2 cloves garlic, minced",
        "2 tablespoons fresh parsley, chopped",
        "2 tablespoons olive oil",
        "Salt and pepper to taste"
      ],
      steps: [
        "Preheat oven to 190°C (375°F).",
        "Clean mushrooms, remove stems and chop finely.",
        "In a bowl, mix chopped stems, cream cheese, Parmesan, breadcrumbs, garlic, parsley.",
        "Season with salt and pepper.",
        "Fill mushroom caps with mixture.",
        "Arrange on baking sheet, drizzle with olive oil.",
        "Bake for 20 minutes until golden.",
        "Serve warm."
      ]
    },
    { 
      id: 4, 
      name: "French Onion Soup",
      tagline: "Rich beef broth with caramelized onions and cheese",
      image: continentalImages[3],
      pantryKeywords: ["onion", "beef broth", "cheese", "bread"],
      ingredients: [
        "4 large onions, thinly sliced",
        "4 tablespoons butter",
        "2 tablespoons olive oil",
        "8 cups beef broth",
        "1 teaspoon thyme",
        "1 bay leaf",
        "Salt and pepper to taste",
        "1 baguette, sliced",
        "1 cup Gruyère cheese, grated"
      ],
      steps: [
        "In large pot, heat butter and oil over medium heat.",
        "Add onions, cook for 30-40 minutes until caramelized.",
        "Add thyme and bay leaf, cook for 2 minutes.",
        "Add beef broth, bring to boil, then simmer for 20 minutes.",
        "Season with salt and pepper.",
        "Toast bread slices.",
        "Ladle soup into oven-safe bowls.",
        "Top with toast and generous cheese.",
        "Broil until cheese melts and bubbles.",
        "Serve hot."
      ]
    },
    { 
      id: 5, 
      name: "Caesar Salad",
      tagline: "Classic salad with creamy dressing and croutons",
      image: continentalImages[4],
      pantryKeywords: ["lettuce", "parmesan", "bread", "eggs"],
      ingredients: [
        "2 heads romaine lettuce, chopped",
        "1 cup croutons",
        "½ cup Parmesan cheese, shaved",
        "For dressing:",
        "2 anchovy fillets",
        "2 cloves garlic",
        "1 egg yolk",
        "2 tablespoons lemon juice",
        "1 teaspoon Dijon mustard",
        "½ cup olive oil",
        "Salt and pepper"
      ],
      steps: [
        "In blender, combine anchovies, garlic, egg yolk, lemon juice, mustard.",
        "Blend until smooth, slowly drizzle olive oil.",
        "Season with salt and pepper.",
        "In large bowl, add lettuce, dressing, and toss well.",
        "Top with croutons and Parmesan shavings.",
        "Serve immediately."
      ]
    },

    // ========== MAIN COURSES - CHICKEN (6) ==========
    { 
      id: 6, 
      name: "Chicken Alfredo",
      tagline: "Creamy pasta with grilled chicken",
      image: continentalImages[5],
      pantryKeywords: ["chicken", "pasta", "cream", "parmesan"],
      ingredients: [
        "500g fettuccine pasta",
        "2 chicken breasts, sliced",
        "2 tablespoons olive oil",
        "4 cloves garlic, minced",
        "2 cups heavy cream",
        "1 cup Parmesan cheese, grated",
        "½ cup butter",
        "Salt and pepper to taste",
        "Fresh parsley for garnish"
      ],
      steps: [
        "Cook pasta according to package, drain and set aside.",
        "Season chicken with salt and pepper.",
        "Heat oil in pan, cook chicken until golden and cooked through.",
        "Remove chicken, set aside.",
        "In same pan, melt butter, add garlic, cook for 1 minute.",
        "Add cream, simmer for 5 minutes.",
        "Add Parmesan, stir until melted.",
        "Add cooked pasta and chicken, toss to coat.",
        "Garnish with parsley, serve hot."
      ]
    },
    { 
      id: 7, 
      name: "Chicken Cordon Bleu",
      tagline: "Chicken breast stuffed with ham and cheese",
      image: continentalImages[6],
      pantryKeywords: ["chicken", "ham", "cheese", "breadcrumbs"],
      ingredients: [
        "4 chicken breasts",
        "4 slices ham",
        "4 slices Swiss cheese",
        "Salt and pepper",
        "½ cup flour",
        "2 eggs, beaten",
        "1 cup breadcrumbs",
        "¼ cup oil for frying"
      ],
      steps: [
        "Pound chicken breasts to ½ inch thickness.",
        "Season with salt and pepper.",
        "Place ham and cheese on each breast.",
        "Roll tightly and secure with toothpicks.",
        "Dredge in flour, dip in egg, coat with breadcrumbs.",
        "Heat oil in oven-safe pan, sear rolls on all sides.",
        "Bake at 190°C (375°F) for 25-30 minutes.",
        "Rest for 5 minutes, slice and serve."
      ]
    },
    { 
      id: 8, 
      name: "Chicken Marsala",
      tagline: "Chicken in sweet Marsala wine sauce",
      image: continentalImages[7],
      pantryKeywords: ["chicken", "mushrooms", "marsala wine"],
      ingredients: [
        "4 chicken breasts",
        "½ cup flour",
        "Salt and pepper",
        "3 tablespoons olive oil",
        "250g mushrooms, sliced",
        "3 cloves garlic, minced",
        "1 cup Marsala wine",
        "½ cup chicken broth",
        "2 tablespoons butter",
        "Fresh parsley"
      ],
      steps: [
        "Pound chicken thin, season with salt and pepper.",
        "Dredge in flour, shake off excess.",
        "Heat oil in pan, cook chicken 3-4 minutes each side.",
        "Remove chicken, set aside.",
        "Add mushrooms to pan, cook until browned.",
        "Add garlic, cook for 1 minute.",
        "Add Marsala wine, scrape bottom of pan.",
        "Add broth, simmer until sauce thickens.",
        "Return chicken to pan, cook for 5 minutes.",
        "Stir in butter, garnish with parsley, serve."
      ]
    },
    { 
      id: 9, 
      name: "Chicken Parmesan",
      tagline: "Breaded chicken with marinara and cheese",
      image: continentalImages[8],
      pantryKeywords: ["chicken", "mozzarella", "tomato sauce", "breadcrumbs"],
      ingredients: [
        "4 chicken breasts",
        "1 cup flour",
        "2 eggs, beaten",
        "1 cup breadcrumbs",
        "½ cup Parmesan cheese",
        "Salt and pepper",
        "2 cups marinara sauce",
        "2 cups mozzarella cheese",
        "¼ cup oil for frying",
        "Fresh basil"
      ],
      steps: [
        "Pound chicken to even thickness.",
        "Season with salt and pepper.",
        "Dredge in flour, dip in egg, coat with breadcrumbs mixed with Parmesan.",
        "Heat oil, fry chicken until golden (3-4 minutes each side).",
        "Place in baking dish, top with marinara and mozzarella.",
        "Bake at 190°C (375°F) for 15-20 minutes.",
        "Garnish with basil, serve with pasta."
      ]
    },
    { 
      id: 10, 
      name: "Roasted Chicken",
      tagline: "Juicy whole roasted chicken with herbs",
      image: continentalImages[9],
      pantryKeywords: ["chicken", "butter", "garlic", "herbs"],
      ingredients: [
        "1 whole chicken (1.5-2 kg)",
        "4 tablespoons butter, softened",
        "4 cloves garlic, minced",
        "1 lemon, halved",
        "1 tablespoon rosemary",
        "1 tablespoon thyme",
        "1 onion, quartered",
        "Salt and pepper",
        "2 tablespoons olive oil"
      ],
      steps: [
        "Preheat oven to 200°C (400°F).",
        "Pat chicken dry with paper towel.",
        "Mix butter with garlic, rosemary, thyme, salt, pepper.",
        "Gently loosen skin, rub butter mixture under skin.",
        "Stuff cavity with lemon and onion.",
        "Tie legs with kitchen twine.",
        "Rub outside with olive oil, season with salt.",
        "Roast for 60-75 minutes until juices run clear.",
        "Rest for 15 minutes before carving.",
        "Serve with roasted vegetables."
      ]
    },
    { 
      id: 11, 
      name: "Chicken Piccata",
      tagline: "Lemon caper sauce over chicken",
      image: continentalImages[10],
      pantryKeywords: ["chicken", "lemon", "capers", "butter"],
      ingredients: [
        "4 chicken breasts",
        "½ cup flour",
        "Salt and pepper",
        "3 tablespoons olive oil",
        "3 tablespoons butter",
        "½ cup chicken broth",
        "¼ cup lemon juice",
        "2 tablespoons capers",
        "Fresh parsley"
      ],
      steps: [
        "Pound chicken thin, season with salt and pepper.",
        "Dredge in flour, shake off excess.",
        "Heat oil and 2 tablespoons butter in pan.",
        "Cook chicken 3-4 minutes each side, remove.",
        "Add broth, lemon juice, capers to pan, simmer.",
        "Return chicken to pan, cook for 3 minutes.",
        "Stir in remaining butter until melted.",
        "Garnish with parsley, serve."
      ]
    },

    // ========== MAIN COURSES - BEEF (6) ==========
    { 
      id: 12, 
      name: "Beef Stroganoff",
      tagline: "Tender beef in creamy mushroom sauce",
      image: continentalImages[11],
      pantryKeywords: ["beef", "mushrooms", "cream", "onion"],
      ingredients: [
        "500g beef sirloin, thinly sliced",
        "2 tablespoons flour",
        "Salt and pepper",
        "2 tablespoons oil",
        "1 onion, chopped",
        "250g mushrooms, sliced",
        "2 cloves garlic, minced",
        "1 cup beef broth",
        "1 tablespoon Dijon mustard",
        "½ cup sour cream",
        "Fresh parsley"
      ],
      steps: [
        "Toss beef with flour, salt, pepper.",
        "Heat oil, brown beef quickly, remove.",
        "Add onion and mushrooms, cook until softened.",
        "Add garlic, cook for 1 minute.",
        "Add broth and mustard, simmer until reduced.",
        "Return beef to pan, cook for 2 minutes.",
        "Remove from heat, stir in sour cream.",
        "Garnish with parsley, serve over noodles."
      ]
    },
    { 
      id: 13, 
      name: "Beef Wellington",
      tagline: "Beef tenderloin wrapped in puff pastry",
      image: continentalImages[12],
      pantryKeywords: ["beef", "mushrooms", "pastry", "prosciutto"],
      ingredients: [
        "1 kg beef tenderloin",
        "Salt and pepper",
        "2 tablespoons oil",
        "2 tablespoons butter",
        "500g mushrooms, finely chopped",
        "2 shallots, minced",
        "2 cloves garlic",
        "2 tablespoons thyme",
        "8 slices prosciutto",
        "500g puff pastry",
        "1 egg, beaten"
      ],
      steps: [
        "Season beef, sear in hot oil until browned all over.",
        "Cool completely.",
        "Sauté mushrooms, shallots, garlic until dry paste (duxelles).",
        "Layer plastic wrap, place prosciutto overlapping.",
        "Spread duxelles over prosciutto.",
        "Place beef in center, roll tightly, chill 30 minutes.",
        "Roll out pastry, wrap beef, seal edges.",
        "Brush with egg, score top, chill 15 minutes.",
        "Bake at 200°C (400°F) for 25-30 minutes.",
        "Rest 10 minutes before slicing."
      ]
    },
    { 
      id: 14, 
      name: "Grilled Steak",
      tagline: "Perfectly grilled steak with herb butter",
      image: continentalImages[13],
      pantryKeywords: ["steak", "butter", "garlic", "rosemary"],
      ingredients: [
        "2 ribeye or sirloin steaks",
        "2 tablespoons olive oil",
        "Salt and pepper",
        "For herb butter:",
        "4 tablespoons butter, softened",
        "2 cloves garlic, minced",
        "1 tablespoon parsley, chopped",
        "1 teaspoon rosemary, chopped"
      ],
      steps: [
        "Take steaks out 30 minutes before cooking.",
        "Mix butter ingredients, form log, chill.",
        "Pat steaks dry, rub with oil, season generously.",
        "Heat grill or pan to high heat.",
        "Cook steaks 4-5 minutes each side for medium-rare.",
        "Rest steaks for 5-10 minutes.",
        "Top with herb butter slice, serve."
      ]
    },
    { 
      id: 15, 
      name: "Meatloaf",
      tagline: "Classic homestyle meatloaf",
      image: continentalImages[14],
      pantryKeywords: ["beef mince", "breadcrumbs", "eggs", "onion"],
      ingredients: [
        "500g beef mince",
        "1 cup breadcrumbs",
        "1 onion, finely chopped",
        "2 eggs, beaten",
        "2 cloves garlic, minced",
        "¼ cup ketchup",
        "1 tablespoon Worcestershire sauce",
        "1 teaspoon thyme",
        "Salt and pepper",
        "For glaze: ¼ cup ketchup, 1 tablespoon brown sugar"
      ],
      steps: [
        "Preheat oven to 180°C (350°F).",
        "Mix all meatloaf ingredients in bowl.",
        "Shape into loaf in baking dish.",
        "Mix glaze ingredients, spread on top.",
        "Bake for 50-60 minutes until cooked through.",
        "Rest 10 minutes before slicing.",
        "Serve with mashed potatoes."
      ]
    },
    { 
      id: 16, 
      name: "Pot Roast",
      tagline: "Slow-cooked beef with vegetables",
      image: continentalImages[15],
      pantryKeywords: ["beef", "carrots", "potatoes", "onion"],
      ingredients: [
        "1.5 kg beef chuck roast",
        "2 tablespoons oil",
        "Salt and pepper",
        "2 onions, quartered",
        "4 carrots, chopped",
        "4 potatoes, halved",
        "4 cloves garlic",
        "2 cups beef broth",
        "1 cup red wine",
        "2 tablespoons tomato paste",
        "2 bay leaves",
        "2 sprigs rosemary"
      ],
      steps: [
        "Season beef generously with salt and pepper.",
        "Heat oil in Dutch oven, sear beef all sides.",
        "Remove beef, add onions, cook until softened.",
        "Add garlic, tomato paste, cook 1 minute.",
        "Add wine, scrape bottom, simmer until reduced.",
        "Add broth, bay leaves, rosemary, return beef.",
        "Cover and cook at 160°C (325°F) for 2 hours.",
        "Add vegetables, cook 1 more hour.",
        "Rest beef, slice, serve with vegetables and gravy."
      ]
    },
    { 
      id: 17, 
      name: "Beef Bourguignon",
      tagline: "French red wine braised beef",
      image: continentalImages[16],
      pantryKeywords: ["beef", "red wine", "mushrooms", "carrots"],
      ingredients: [
        "1.5 kg beef chuck, cubed",
        "2 tablespoons oil",
        "200g bacon, diced",
        "2 carrots, sliced",
        "1 onion, chopped",
        "3 cloves garlic",
        "2 tablespoons flour",
        "750ml red wine",
        "2 cups beef broth",
        "2 tablespoons tomato paste",
        "1 bouquet garni (thyme, bay leaf, parsley)",
        "250g mushrooms",
        "Salt and pepper"
      ],
      steps: [
        "Preheat oven to 160°C (325°F).",
        "Brown beef in batches, set aside.",
        "Cook bacon until crisp, remove.",
        "Sauté carrots and onion until soft.",
        "Add garlic, cook 1 minute.",
        "Return beef and bacon to pot.",
        "Sprinkle flour, stir, cook 2 minutes.",
        "Add wine, broth, tomato paste, bouquet garni.",
        "Bring to boil, cover and bake for 2½ hours.",
        "Add mushrooms, cook 30 more minutes.",
        "Serve with mashed potatoes."
      ]
    },

    // ========== PASTA (6) ==========
    { 
      id: 18, 
      name: "Spaghetti Bolognese",
      tagline: "Classic meat sauce with spaghetti",
      image: continentalImages[17],
      pantryKeywords: ["spaghetti", "beef mince", "tomato", "onion"],
      ingredients: [
        "500g spaghetti",
        "500g beef mince",
        "1 onion, chopped",
        "2 carrots, diced",
        "2 celery stalks, diced",
        "3 cloves garlic, minced",
        "800g canned tomatoes",
        "2 tablespoons tomato paste",
        "1 cup red wine",
        "1 cup beef broth",
        "1 teaspoon oregano",
        "Salt and pepper",
        "Parmesan cheese"
      ],
      steps: [
        "Heat oil, cook onion, carrot, celery until soft.",
        "Add garlic, cook 1 minute.",
        "Add mince, cook until browned.",
        "Add tomato paste, cook 2 minutes.",
        "Add wine, simmer until reduced.",
        "Add tomatoes, broth, oregano, salt, pepper.",
        "Simmer for 1-2 hours, stirring occasionally.",
        "Cook spaghetti according to package.",
        "Serve sauce over spaghetti with Parmesan."
      ]
    },
    { 
      id: 19, 
      name: "Lasagna",
      tagline: "Layered pasta with meat sauce and cheese",
      image: continentalImages[18],
      pantryKeywords: ["lasagna sheets", "beef mince", "cheese", "tomato"],
      ingredients: [
        "12 lasagna sheets",
        "For meat sauce:",
        "500g beef mince",
        "1 onion, chopped",
        "3 cloves garlic",
        "800g crushed tomatoes",
        "2 tablespoons tomato paste",
        "1 teaspoon oregano",
        "For cheese sauce:",
        "4 tablespoons butter",
        "¼ cup flour",
        "3 cups milk",
        "2 cups mozzarella",
        "1 cup Parmesan"
      ],
      steps: [
        "Cook meat sauce: brown mince with onion, garlic.",
        "Add tomatoes, paste, oregano, simmer 30 minutes.",
        "For cheese sauce: melt butter, add flour, cook 1 minute.",
        "Whisk in milk gradually, cook until thick.",
        "Add 1 cup mozzarella and Parmesan, stir until melted.",
        "Preheat oven to 180°C.",
        "Layer in dish: meat sauce, pasta, cheese sauce.",
        "Repeat layers, top with remaining mozzarella.",
        "Bake 40 minutes, rest 15 minutes before serving."
      ]
    },
    { 
      id: 20, 
      name: "Fettuccine Alfredo",
      tagline: "Rich and creamy pasta",
      image: continentalImages[19],
      pantryKeywords: ["fettuccine", "cream", "butter", "parmesan"],
      ingredients: [
        "500g fettuccine",
        "1 cup butter",
        "2 cups heavy cream",
        "2 cups Parmesan cheese, grated",
        "Salt and pepper",
        "Fresh parsley",
        "Pinch of nutmeg"
      ],
      steps: [
        "Cook pasta according to package.",
        "In large pan, melt butter over medium heat.",
        "Add cream, simmer for 5 minutes.",
        "Gradually whisk in Parmesan until smooth.",
        "Season with salt, pepper, nutmeg.",
        "Drain pasta, add to sauce, toss well.",
        "Cook for 2 minutes until sauce coats pasta.",
        "Serve immediately with extra Parmesan."
      ]
    },
    { 
      id: 21, 
      name: "Macaroni and Cheese",
      tagline: "Creamy baked mac and cheese",
      image: continentalImages[20],
      pantryKeywords: ["macaroni", "cheese", "milk", "butter"],
      ingredients: [
        "500g macaroni",
        "4 tablespoons butter",
        "¼ cup flour",
        "3 cups milk",
        "2 cups cheddar cheese, grated",
        "1 cup mozzarella, grated",
        "½ cup Parmesan",
        "Salt and pepper",
        "½ cup breadcrumbs",
        "Paprika"
      ],
      steps: [
        "Cook macaroni al dente, drain.",
        "Melt butter, add flour, cook 1 minute.",
        "Whisk in milk gradually, cook until thick.",
        "Add 1½ cups cheddar, mozzarella, Parmesan, stir until melted.",
        "Season with salt and pepper.",
        "Mix sauce with macaroni.",
        "Transfer to baking dish.",
        "Top with remaining cheddar and breadcrumbs.",
        "Sprinkle paprika, bake at 180°C for 25 minutes."
      ]
    },
    { 
      id: 22, 
      name: "Ravioli",
      tagline: "Stuffed pasta with sage butter",
      image: continentalImages[21],
      pantryKeywords: ["ravioli", "butter", "sage", "parmesan"],
      ingredients: [
        "500g cheese or spinach ravioli",
        "½ cup butter",
        "10 fresh sage leaves",
        "½ cup Parmesan cheese",
        "Salt and pepper",
        "Pine nuts (optional)"
      ],
      steps: [
        "Cook ravioli according to package.",
        "Meanwhile, melt butter in pan until foaming.",
        "Add sage leaves, cook until crispy.",
        "Drain ravioli, add to pan with sage butter.",
        "Toss gently to coat.",
        "Season with salt and pepper.",
        "Serve with Parmesan and pine nuts."
      ]
    },
    { 
      id: 23, 
      name: "Pasta Carbonara",
      tagline: "Creamy egg and bacon pasta",
      image: continentalImages[22],
      pantryKeywords: ["spaghetti", "eggs", "bacon", "parmesan"],
      ingredients: [
        "500g spaghetti",
        "200g pancetta or bacon, diced",
        "4 eggs",
        "1 cup Parmesan cheese, grated",
        "4 cloves garlic",
        "Black pepper",
        "Salt",
        "Fresh parsley"
      ],
      steps: [
        "Cook pasta according to package, reserve 1 cup pasta water.",
        "In a bowl, whisk eggs with Parmesan and black pepper.",
        "Cook pancetta until crispy, add garlic, cook 1 minute.",
        "Remove from heat, add hot spaghetti, toss.",
        "Quickly pour egg mixture and toss vigorously.",
        "Add pasta water if needed for creamy sauce.",
        "Season with salt and more pepper.",
        "Serve immediately with extra Parmesan."
      ]
    },

    // ========== FISH & SEAFOOD (5) ==========
    { 
      id: 24, 
      name: "Grilled Salmon",
      tagline: "Salmon with lemon dill sauce",
      image: continentalImages[23],
      pantryKeywords: ["salmon", "lemon", "dill", "butter"],
      ingredients: [
        "4 salmon fillets",
        "2 tablespoons olive oil",
        "Salt and pepper",
        "For sauce:",
        "½ cup sour cream",
        "2 tablespoons lemon juice",
        "1 tablespoon fresh dill, chopped",
        "1 clove garlic, minced"
      ],
      steps: [
        "Pat salmon dry, brush with oil, season with salt and pepper.",
        "Preheat grill or pan to medium-high.",
        "Cook salmon skin-side down for 4-5 minutes.",
        "Flip and cook 3-4 more minutes.",
        "Mix all sauce ingredients in a bowl.",
        "Serve salmon with sauce and lemon wedges."
      ]
    },
    { 
      id: 25, 
      name: "Fish and Chips",
      tagline: "Crispy battered fish with fries",
      image: continentalImages[24],
      pantryKeywords: ["fish", "potato", "flour", "beer"],
      ingredients: [
        "4 white fish fillets (cod/haddock)",
        "4 large potatoes, cut into chips",
        "1 cup flour",
        "1 teaspoon baking powder",
        "1 cup cold beer",
        "Salt and pepper",
        "Oil for deep frying",
        "For serving: malt vinegar, tartar sauce"
      ],
      steps: [
        "Soak chips in cold water for 30 minutes, dry well.",
        "Heat oil to 160°C, fry chips until soft but not colored.",
        "Drain and set aside.",
        "Mix flour, baking powder, salt, pepper.",
        "Whisk in beer until smooth batter.",
        "Dip fish in batter, let excess drip.",
        "Heat oil to 180°C, fry fish until golden (5-6 minutes).",
        "Increase oil to 190°C, fry chips until golden and crispy.",
        "Serve with malt vinegar and tartar sauce."
      ]
    },
    { 
      id: 26, 
      name: "Shrimp Scampi",
      tagline: "Garlic butter shrimp with pasta",
      image: continentalImages[25],
      pantryKeywords: ["shrimp", "garlic", "butter", "lemon"],
      ingredients: [
        "500g large shrimp, peeled",
        "350g linguine pasta",
        "4 tablespoons butter",
        "2 tablespoons olive oil",
        "6 cloves garlic, minced",
        "½ teaspoon red chili flakes",
        "½ cup white wine",
        "¼ cup lemon juice",
        "Fresh parsley",
        "Salt and pepper"
      ],
      steps: [
        "Cook pasta according to package.",
        "Season shrimp with salt and pepper.",
        "Heat oil and 2 tablespoons butter in pan.",
        "Cook shrimp 1-2 minutes each side, remove.",
        "Add garlic and chili flakes, cook 1 minute.",
        "Add wine and lemon juice, simmer until reduced.",
        "Return shrimp to pan, add remaining butter.",
        "Toss with cooked pasta and parsley.",
        "Serve immediately."
      ]
    },
    { 
      id: 27, 
      name: "Lobster Thermidor",
      tagline: "Luxurious lobster in creamy sauce",
      image: continentalImages[26],
      pantryKeywords: ["lobster", "mushrooms", "cream", "cheese"],
      ingredients: [
        "2 cooked lobsters",
        "2 tablespoons butter",
        "2 shallots, minced",
        "200g mushrooms, chopped",
        "2 tablespoons flour",
        "1 cup milk",
        "½ cup cream",
        "2 tablespoons Dijon mustard",
        "½ cup Gruyère cheese",
        "¼ cup Parmesan",
        "Fresh tarragon",
        "Salt and pepper"
      ],
      steps: [
        "Remove lobster meat, chop, reserve shells.",
        "Melt butter, cook shallots and mushrooms.",
        "Add flour, cook 1 minute.",
        "Whisk in milk and cream until thick.",
        "Add mustard, cheeses, tarragon, season.",
        "Stir in lobster meat.",
        "Fill lobster shells with mixture.",
        "Sprinkle with extra cheese.",
        "Broil until golden and bubbly.",
        "Serve immediately."
      ]
    },
    { 
      id: 28, 
      name: "Seafood Paella",
      tagline: "Spanish rice with mixed seafood",
      image: continentalImages[27],
      pantryKeywords: ["rice", "shrimp", "mussels", "saffron"],
      ingredients: [
        "2 tablespoons olive oil",
        "1 onion, chopped",
        "4 cloves garlic",
        "2 tomatoes, grated",
        "1 teaspoon paprika",
        "Pinch of saffron",
        "2 cups short-grain rice",
        "4 cups fish stock",
        "500g shrimp",
        "500g mussels",
        "200g calamari, sliced",
        "½ cup peas",
        "Lemon wedges",
        "Parsley"
      ],
      steps: [
        "Heat oil in paella pan, cook onion until soft.",
        "Add garlic, cook 1 minute.",
        "Add tomatoes, paprika, saffron, cook 5 minutes.",
        "Add rice, stir to coat.",
        "Add hot stock, simmer for 15 minutes.",
        "Arrange seafood on top, cook 10 more minutes.",
        "Add peas, cook until rice is done.",
        "Rest for 5 minutes off heat.",
        "Garnish with parsley and lemon wedges.",
        "Serve from the pan."
      ]
    },

    // ========== ADDITIONAL MAIN COURSES (2) ==========
    { 
      id: 29, 
      name: "Osso Buco",
      tagline: "Braised veal shanks in rich sauce",
      image: continentalImages[28],
      pantryKeywords: ["veal", "tomato", "wine", "vegetables"],
      ingredients: [
        "4 veal shanks",
        "Salt and pepper",
        "Flour for dredging",
        "4 tablespoons oil",
        "2 onions, chopped",
        "2 carrots, chopped",
        "2 celery stalks, chopped",
        "4 cloves garlic",
        "2 cups white wine",
        "2 cups beef broth",
        "400g crushed tomatoes",
        "1 bouquet garni",
        "For gremolata: lemon zest, garlic, parsley"
      ],
      steps: [
        "Season veal, dredge in flour.",
        "Brown veal in oil, remove.",
        "Sauté vegetables until soft.",
        "Add garlic, cook 1 minute.",
        "Add wine, reduce by half.",
        "Add broth, tomatoes, bouquet garni.",
        "Return veal, cover and simmer for 2 hours.",
        "Mix gremolata ingredients.",
        "Serve veal with sauce and gremolata.",
        "Pair with risotto."
      ]
    },
    { 
      id: 30, 
      name: "Lamb Chops",
      tagline: "Herb-crusted lamb chops",
      image: continentalImages[29],
      pantryKeywords: ["lamb chops", "rosemary", "garlic", "butter"],
      ingredients: [
        "8 lamb chops",
        "4 tablespoons olive oil",
        "4 cloves garlic, minced",
        "2 tablespoons rosemary, chopped",
        "2 tablespoons thyme, chopped",
        "Salt and pepper",
        "4 tablespoons butter"
      ],
      steps: [
        "Mix oil, garlic, rosemary, thyme.",
        "Rub mixture on lamb chops, marinate 1 hour.",
        "Season with salt and pepper.",
        "Heat pan to high heat.",
        "Cook chops 3-4 minutes each side for medium-rare.",
        "Add butter to pan, baste chops.",
        "Rest for 5 minutes.",
        "Serve with roasted vegetables."
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
      
      const scoredRecipes = continentalRecipes.map(recipe => {
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
    <div className="continental-page">
      {/* Header */}
      <header className="continental-header">
        <div className="continental-header-content">
          <h1 className="continental-page-title">Continental Cuisine</h1>
          <p className="continental-page-description">
            Classic European flavors, timeless elegance
          </p>
        </div>
      </header>

      {/* Pantry Suggestions - 2 Recipes */}
      {showSuggestions && (
        <div className="continental-pantry-suggestions">
          <div className="continental-suggestions-header">
            <i className="fas fa-lightbulb"></i>
            <h3>Based on your pantry, you can make:</h3>
          </div>
          <div className="continental-suggestions-grid two-suggestions">
            {suggestedRecipes.map(recipe => (
              <div 
                key={`suggest-${recipe.id}`} 
                className="continental-suggestion-card"
                onClick={() => applySuggestion(recipe)}
              >
                <div className="continental-suggestion-image" style={{backgroundImage: `url(${recipe.image})`}}></div>
                <div className="continental-suggestion-content">
                  <h4>{recipe.name}</h4>
                  <p>{recipe.tagline}</p>
                  <p className="continental-match-info">✓ {recipe.score} items match your pantry</p>
                  <button className="continental-suggestion-btn">Cook This</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipes Grid */}
      <main className="continental-main">
        <div className="continental-grid-section">
          <div className="continental-grid">
            {continentalRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="continental-technique-card"
                onClick={() => handleRecipeSelect(recipe)}
              >
                <div 
                  className="continental-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                
                <div className="continental-card-content">
                  <h3 className="continental-card-title">{recipe.name}</h3>
                  <p className="continental-card-description">{recipe.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {showDetailPanel && selectedRecipe && (
        <div className="continental-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="continental-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="continental-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="continental-modal-header">
              <div className="continental-modal-title">
                <h2>{selectedRecipe.name}</h2>
                <p>{selectedRecipe.tagline}</p>
              </div>
            </div>

            <div className="continental-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="continental-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="continental-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="continental-ingredient-item">
                      <span className="continental-ingredient-bullet">•</span>
                      <span className="continental-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="continental-modal-steps">
                <h3>Steps to Make</h3>
                <div className="continental-steps-list">
                  {selectedRecipe.steps.map((step, idx) => (
                    <div key={idx} className="continental-step-item">
                      <span className="continental-step-number">{idx + 1}.</span>
                      <span className="continental-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="continental-modal-voice-container">
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

export default ContinentalCuisine;