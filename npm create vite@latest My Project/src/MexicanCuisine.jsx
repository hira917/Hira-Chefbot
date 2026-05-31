import React, { useState, useEffect, useRef } from 'react';
import './MexicanCuisine.css';

const MexicanCuisine = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pantryItems, setPantryItems] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const speechSynthesisRef = useRef(null);

  // Mexican Cuisine images
  const mexicanImages = [
    // Tacos (5)
    "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500", // Tacos al Pastor
    "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500", // Tacos de Carne Asada
    "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500", // Tacos de Pollo
    "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500", // Tacos de Pescado
    "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500", // Tacos de Barbacoa
    
    // Burritos & Enchiladas (5)
    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500", // Burrito
    "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=500", // Enchiladas
    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500", // Chimichanga
    "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=500", // Quesadilla
    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500", // Flautas
    
    // Main Dishes - Meat (6)
    "https://images.unsplash.com/photo-1565557623262-b1cacc9e3f2c?w=500", // Carne Asada
    "https://images.unsplash.com/photo-1565557623262-b1cacc9e3f2c?w=500", // Pollo Asado
    "https://images.unsplash.com/photo-1565557623262-b1cacc9e3f2c?w=500", // Carnitas
    "https://images.unsplash.com/photo-1565557623262-b1cacc9e3f2c?w=500", // Barbacoa
    "https://images.unsplash.com/photo-1565557623262-b1cacc9e3f2c?w=500", // Cochinita Pibil
    "https://images.unsplash.com/photo-1565557623262-b1cacc9e3f2c?w=500", // Mole Poblano
    
    // Casseroles & Dishes (5)
    "https://images.unsplash.com/photo-1574482620810-3d2fb5b5b5b5?w=500", // Chiles Rellenos
    "https://images.unsplash.com/photo-1574482620810-3d2fb5b5b5b5?w=500", // Tamales
    "https://images.unsplash.com/photo-1574482620810-3d2fb5b5b5b5?w=500", // Pozole
    "https://images.unsplash.com/photo-1574482620810-3d2fb5b5b5b5?w=500", // Menudo
    "https://images.unsplash.com/photo-1574482620810-3d2fb5b5b5b5?w=500", // Chilaquiles
    
    // Rice & Beans (4)
    "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500", // Mexican Rice
    "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500", // Refried Beans
    "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500", // Arroz con Pollo
    "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=500", // Frijoles Charros
    
    // Seafood (5)
    "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500", // Ceviche
    "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500", // Camarones al Mojo de Ajo
    "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500", // Pescado a la Veracruzana
    "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500", // Tacos de Pescado
    "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500", // Cocktel de Camarones
  ];

  // Complete Mexican Cuisine Recipes (30 items - all main courses)
  const mexicanRecipes = [
    // ========== TACOS (5) ==========
    { 
      id: 1, 
      name: "Tacos al Pastor",
      tagline: "Spicy pork tacos with pineapple",
      image: mexicanImages[0],
      pantryKeywords: ["pork", "pineapple", "tortilla", "achiote"],
      ingredients: [
        "500g pork shoulder, thinly sliced",
        "For marinade:",
        "3 dried guajillo chilies",
        "2 dried ancho chilies",
        "2 cloves garlic",
        "1 tablespoon achiote paste",
        "1 teaspoon cumin",
        "1 teaspoon oregano",
        "½ cup pineapple juice",
        "2 tablespoons vinegar",
        "Salt to taste",
        "For serving:",
        "Corn tortillas",
        "Fresh pineapple, diced",
        "1 onion, chopped",
        "Fresh cilantro",
        "Lime wedges",
        "Salsa"
      ],
      steps: [
        "Toast dried chilies, soak in hot water until soft.",
        "Blend chilies with garlic, achiote, cumin, oregano, pineapple juice, vinegar, salt.",
        "Marinate pork in mixture for at least 4 hours.",
        "Cook pork on grill or in hot pan until caramelized.",
        "Warm corn tortillas.",
        "Serve pork on tortillas with pineapple, onion, cilantro.",
        "Squeeze lime juice, add salsa."
      ]
    },
    { 
      id: 2, 
      name: "Tacos de Carne Asada",
      tagline: "Grilled steak tacos",
      image: mexicanImages[1],
      pantryKeywords: ["beef", "tortilla", "lime", "cilantro"],
      ingredients: [
        "500g flank steak or skirt steak",
        "For marinade:",
        "¼ cup olive oil",
        "¼ cup orange juice",
        "2 limes, juiced",
        "3 cloves garlic, minced",
        "1 teaspoon cumin",
        "1 teaspoon chili powder",
        "½ cup cilantro, chopped",
        "Salt and pepper",
        "For serving:",
        "Corn tortillas",
        "1 onion, finely chopped",
        "Fresh cilantro",
        "Lime wedges",
        "Salsa verde"
      ],
      steps: [
        "Mix all marinade ingredients in a bowl.",
        "Add steak, coat well, marinate 2-4 hours.",
        "Grill steak over high heat 4-5 minutes each side.",
        "Rest steak 10 minutes, then slice thinly against grain.",
        "Warm tortillas on grill or pan.",
        "Serve steak on tortillas with onion, cilantro.",
        "Squeeze lime juice, add salsa."
      ]
    },
    { 
      id: 3, 
      name: "Tacos de Pollo",
      tagline: "Mexican chicken tacos",
      image: mexicanImages[2],
      pantryKeywords: ["chicken", "tortilla", "onion", "cilantro"],
      ingredients: [
        "500g chicken thighs",
        "For seasoning:",
        "2 tablespoons oil",
        "1 onion, sliced",
        "2 cloves garlic",
        "1 teaspoon cumin",
        "1 teaspoon chili powder",
        "½ teaspoon oregano",
        "Salt and pepper",
        "For serving:",
        "Corn tortillas",
        "1 onion, chopped",
        "Fresh cilantro",
        "Lime wedges",
        "Salsa roja"
      ],
      steps: [
        "Season chicken with salt, pepper, cumin, chili powder.",
        "Heat oil in pan, cook chicken until golden and cooked through.",
        "Remove chicken, shred with two forks.",
        "In same pan, sauté onion and garlic until soft.",
        "Return shredded chicken to pan, mix well.",
        "Warm tortillas.",
        "Serve chicken on tortillas with onion, cilantro.",
        "Add salsa and lime juice."
      ]
    },
    { 
      id: 4, 
      name: "Tacos de Pescado",
      tagline: "Baja-style fish tacos",
      image: mexicanImages[3],
      pantryKeywords: ["fish", "tortilla", "cabbage", "crema"],
      ingredients: [
        "500g white fish (cod or tilapia)",
        "1 cup flour",
        "1 teaspoon baking powder",
        "1 cup beer",
        "1 egg",
        "Salt and pepper",
        "Oil for frying",
        "For serving:",
        "Corn tortillas",
        "Shredded cabbage",
        "Crema or sour cream",
        "Pico de gallo",
        "Lime wedges",
        "Chipotle sauce"
      ],
      steps: [
        "Mix flour, baking powder, salt, pepper.",
        "Whisk in beer and egg until smooth batter.",
        "Cut fish into strips, dip in batter.",
        "Heat oil, fry fish until golden and crispy.",
        "Drain on paper towels.",
        "Warm tortillas.",
        "Layer cabbage, fish, crema, pico de gallo.",
        "Drizzle with chipotle sauce, serve with lime."
      ]
    },
    { 
      id: 5, 
      name: "Tacos de Barbacoa",
      tagline: "Slow-cooked beef tacos",
      image: mexicanImages[4],
      pantryKeywords: ["beef", "chilies", "tortilla", "onion"],
      ingredients: [
        "1 kg beef chuck roast",
        "3 dried guajillo chilies",
        "3 dried chipotle chilies",
        "4 cloves garlic",
        "1 onion, quartered",
        "2 tablespoons vinegar",
        "1 teaspoon cumin",
        "1 teaspoon oregano",
        "2 bay leaves",
        "Salt to taste",
        "For serving:",
        "Corn tortillas",
        "1 onion, chopped",
        "Fresh cilantro",
        "Lime wedges",
        "Salsa"
      ],
      steps: [
        "Toast chilies, soak in hot water until soft.",
        "Blend chilies with garlic, onion, vinegar, cumin, oregano, salt.",
        "Place beef in slow cooker, add chili sauce and bay leaves.",
        "Cook on low for 8 hours until tender.",
        "Shred beef with forks.",
        "Warm tortillas.",
        "Serve barbacoa on tortillas with onion, cilantro.",
        "Add salsa and lime juice."
      ]
    },

    // ========== BURRITOS & ENCHILADAS (5) ==========
    { 
      id: 6, 
      name: "Burrito",
      tagline: "Large flour tortilla stuffed with fillings",
      image: mexicanImages[5],
      pantryKeywords: ["flour tortilla", "rice", "beans", "meat"],
      ingredients: [
        "4 large flour tortillas",
        "For filling:",
        "2 cups cooked rice",
        "2 cups refried beans",
        "500g carne asada or chicken, cooked and sliced",
        "1 cup salsa",
        "1 cup sour cream",
        "1 cup shredded lettuce",
        "1 cup grated cheese",
        "1 onion, diced",
        "Fresh cilantro"
      ],
      steps: [
        "Warm tortillas in dry pan or microwave.",
        "Layer each tortilla with rice, beans, meat.",
        "Add salsa, sour cream, lettuce, cheese, onion, cilantro.",
        "Fold sides inward, then roll tightly from bottom.",
        "Wrap in foil to hold shape.",
        "Serve with extra salsa and sour cream."
      ]
    },
    { 
      id: 7, 
      name: "Enchiladas",
      tagline: "Rolled tortillas baked in chili sauce",
      image: mexicanImages[6],
      pantryKeywords: ["corn tortillas", "chicken", "cheese", "enchilada sauce"],
      ingredients: [
        "12 corn tortillas",
        "500g chicken, cooked and shredded",
        "2 cups enchilada sauce",
        "2 cups grated cheese (cheddar or Monterey Jack)",
        "1 onion, chopped",
        "½ cup sour cream",
        "Fresh cilantro",
        "Oil for frying"
      ],
      steps: [
        "Preheat oven to 180°C (350°F).",
        "Lightly fry tortillas in oil to soften, drain.",
        "Fill each tortilla with chicken and some cheese.",
        "Roll tightly and place seam-side down in baking dish.",
        "Pour enchilada sauce over tortillas.",
        "Sprinkle remaining cheese on top.",
        "Bake for 20 minutes until bubbly.",
        "Garnish with sour cream, onion, cilantro."
      ]
    },
    { 
      id: 8, 
      name: "Chimichanga",
      tagline: "Deep-fried burrito",
      image: mexicanImages[7],
      pantryKeywords: ["flour tortilla", "meat", "beans", "cheese"],
      ingredients: [
        "4 large flour tortillas",
        "500g cooked meat (chicken or beef), shredded",
        "1 cup refried beans",
        "1 cup cooked rice",
        "1 cup grated cheese",
        "Oil for deep frying",
        "For topping:",
        "Sour cream",
        "Salsa",
        "Guacamole"
      ],
      steps: [
        "Warm tortillas to make pliable.",
        "Place filling: beans, rice, meat, cheese in center.",
        "Fold sides, roll tightly into burrito shape.",
        "Secure with toothpicks.",
        "Heat oil to 180°C (350°F).",
        "Deep fry chimichangas until golden brown (3-4 minutes).",
        "Drain on paper towels.",
        "Serve with sour cream, salsa, guacamole."
      ]
    },
    { 
      id: 9, 
      name: "Quesadilla",
      tagline: "Cheese-filled tortilla",
      image: mexicanImages[8],
      pantryKeywords: ["flour tortilla", "cheese", "chicken", "vegetables"],
      ingredients: [
        "4 large flour tortillas",
        "2 cups Oaxaca or mozzarella cheese, shredded",
        "200g cooked chicken, shredded (optional)",
        "1 bell pepper, sliced",
        "1 onion, sliced",
        "2 tablespoons oil",
        "For serving:",
        "Sour cream",
        "Salsa",
        "Guacamole"
      ],
      steps: [
        "Heat oil in pan, sauté vegetables until soft.",
        "Heat a large pan or griddle over medium heat.",
        "Place one tortilla in pan, sprinkle half with cheese.",
        "Add chicken and vegetables, top with more cheese.",
        "Fold tortilla over, press gently.",
        "Cook until golden brown, flip carefully.",
        "Cook other side until cheese melts.",
        "Cut into wedges, serve with toppings."
      ]
    },
    { 
      id: 10, 
      name: "Flautas",
      tagline: "Crispy rolled tacos",
      image: mexicanImages[9],
      pantryKeywords: ["corn tortillas", "chicken", "cheese", "oil"],
      ingredients: [
        "12 corn tortillas",
        "500g chicken, cooked and shredded",
        "200g cheese, grated",
        "Oil for frying",
        "For serving:",
        "Sour cream",
        "Salsa",
        "Guacamole",
        "Shredded lettuce"
      ],
      steps: [
        "Warm tortillas to make pliable.",
        "Place chicken and cheese along center of each tortilla.",
        "Roll tightly and secure with toothpicks.",
        "Heat oil to 180°C (350°F).",
        "Fry flautas until golden and crispy.",
        "Drain on paper towels.",
        "Serve with sour cream, salsa, guacamole, lettuce."
      ]
    },

    // ========== MAIN DISHES - MEAT (6) ==========
    { 
      id: 11, 
      name: "Carne Asada",
      tagline: "Grilled marinated steak",
      image: mexicanImages[10],
      pantryKeywords: ["beef", "lime", "garlic", "cilantro"],
      ingredients: [
        "1 kg flank steak or skirt steak",
        "For marinade:",
        "½ cup orange juice",
        "¼ cup lime juice",
        "¼ cup olive oil",
        "4 cloves garlic, minced",
        "1 teaspoon cumin",
        "1 teaspoon chili powder",
        "½ cup cilantro, chopped",
        "Salt and pepper",
        "For serving:",
        "Warm tortillas",
        "Salsa",
        "Guacamole"
      ],
      steps: [
        "Mix all marinade ingredients in a bowl.",
        "Add steak, coat well, marinate 4-24 hours.",
        "Preheat grill to high heat.",
        "Grill steak 4-5 minutes each side for medium-rare.",
        "Rest steak 10 minutes.",
        "Slice thinly against the grain.",
        "Serve with tortillas, salsa, guacamole."
      ]
    },
    { 
      id: 12, 
      name: "Pollo Asado",
      tagline: "Grilled marinated chicken",
      image: mexicanImages[11],
      pantryKeywords: ["chicken", "citrus", "garlic", "achiote"],
      ingredients: [
        "1 whole chicken, cut into pieces",
        "For marinade:",
        "4 cloves garlic",
        "1 teaspoon cumin",
        "1 teaspoon oregano",
        "1 teaspoon chili powder",
        "2 tablespoons achiote paste",
        "½ cup orange juice",
        "¼ cup lime juice",
        "¼ cup olive oil",
        "Salt and pepper"
      ],
      steps: [
        "Mix all marinade ingredients in a blender until smooth.",
        "Pour over chicken, coat well, marinate 4 hours.",
        "Preheat grill to medium-high.",
        "Grill chicken skin-side down 10-12 minutes.",
        "Flip, cook until internal temperature reaches 74°C.",
        "Rest chicken 10 minutes.",
        "Serve with rice, beans, tortillas."
      ]
    },
    { 
      id: 13, 
      name: "Carnitas",
      tagline: "Slow-cooked Mexican pulled pork",
      image: mexicanImages[12],
      pantryKeywords: ["pork shoulder", "orange", "garlic", "spices"],
      ingredients: [
        "1.5 kg pork shoulder, cut into large chunks",
        "1 onion, quartered",
        "4 cloves garlic",
        "1 orange, halved",
        "2 bay leaves",
        "1 teaspoon cumin",
        "1 teaspoon oregano",
        "Salt to taste",
        "Oil for frying"
      ],
      steps: [
        "Place pork in large pot, cover with water.",
        "Add onion, garlic, orange, bay leaves, cumin, oregano, salt.",
        "Simmer for 2-3 hours until pork is tender.",
        "Remove pork, shred with forks.",
        "Heat oil in pan, fry shredded pork until crispy.",
        "Serve with tortillas, salsa, onions, cilantro."
      ]
    },
    { 
      id: 14, 
      name: "Barbacoa",
      tagline: "Slow-cooked spiced beef",
      image: mexicanImages[13],
      pantryKeywords: ["beef", "chilies", "garlic", "spices"],
      ingredients: [
        "1.5 kg beef chuck roast",
        "4 dried guajillo chilies",
        "3 dried ancho chilies",
        "4 cloves garlic",
        "1 onion, chopped",
        "2 tablespoons vinegar",
        "1 teaspoon cumin",
        "1 teaspoon oregano",
        "2 bay leaves",
        "Salt to taste"
      ],
      steps: [
        "Toast chilies, soak in hot water until soft.",
        "Blend chilies with garlic, onion, vinegar, cumin, oregano.",
        "Place beef in slow cooker, add chili sauce and bay leaves.",
        "Cook on low for 8-10 hours until tender.",
        "Shred beef with forks.",
        "Serve with tortillas, salsa, onions, cilantro."
      ]
    },
    { 
      id: 15, 
      name: "Cochinita Pibil",
      tagline: "Yucatan-style slow-roasted pork",
      image: mexicanImages[14],
      pantryKeywords: ["pork", "achiote", "orange", "banana leaves"],
      ingredients: [
        "1.5 kg pork shoulder",
        "For marinade:",
        "4 tablespoons achiote paste",
        "4 cloves garlic",
        "2 teaspoons cumin",
        "1 teaspoon oregano",
        "1 teaspoon black pepper",
        "1 cup sour orange juice (or orange juice with lime)",
        "2 tablespoons vinegar",
        "Salt to taste",
        "Banana leaves for wrapping"
      ],
      steps: [
        "Blend all marinade ingredients until smooth.",
        "Pierce pork with fork, coat with marinade.",
        "Marinate overnight.",
        "Wrap pork in banana leaves, place in baking dish.",
        "Cover with foil, bake at 160°C (325°F) for 3-4 hours.",
        "Shred pork, serve with pickled onions and tortillas."
      ]
    },
    { 
      id: 16, 
      name: "Mole Poblano",
      tagline: "Rich chili chocolate sauce with chicken",
      image: mexicanImages[15],
      pantryKeywords: ["chicken", "chilies", "chocolate", "spices"],
      ingredients: [
        "1 whole chicken, cut into pieces",
        "For mole sauce:",
        "4 dried mulato chilies",
        "4 dried ancho chilies",
        "2 dried pasilla chilies",
        "2 tomatoes",
        "1 onion",
        "4 cloves garlic",
        "¼ cup almonds",
        "¼ cup raisins",
        "2 tablespoons sesame seeds",
        "1 tortilla, torn",
        "2 tablespoons oil",
        "2 tablets Mexican chocolate",
        "1 teaspoon cinnamon",
        "1 teaspoon cumin",
        "Salt to taste",
        "4 cups chicken broth"
      ],
      steps: [
        "Toast chilies, soak in hot water.",
        "Toast tomatoes, onion, garlic until charred.",
        "Toast almonds, raisins, sesame seeds.",
        "Blend all with chilies and tortilla until smooth.",
        "Heat oil in pot, fry sauce for 5 minutes.",
        "Add chocolate, spices, broth, simmer 30 minutes.",
        "Add chicken, cook until tender.",
        "Serve with rice and tortillas."
      ]
    },

    // ========== CASSEROLES & DISHES (5) ==========
    { 
      id: 17, 
      name: "Chiles Rellenos",
      tagline: "Stuffed poblano peppers",
      image: mexicanImages[16],
      pantryKeywords: ["poblano peppers", "cheese", "eggs", "tomato sauce"],
      ingredients: [
        "6 large poblano peppers",
        "300g Oaxaca or mozzarella cheese, cut into strips",
        "For batter:",
        "4 eggs, separated",
        "½ cup flour",
        "Salt",
        "For sauce:",
        "4 tomatoes, roasted",
        "1 onion",
        "2 cloves garlic",
        "1 teaspoon oregano",
        "Salt",
        "Oil for frying"
      ],
      steps: [
        "Roast peppers until skin blisters, place in bag to steam.",
        "Peel skin, make small slit, remove seeds carefully.",
        "Stuff each pepper with cheese strips, close slit.",
        "For sauce: blend tomatoes, onion, garlic, oregano, salt.",
        "Simmer sauce for 10 minutes.",
        "Beat egg whites until stiff, fold in yolks and flour.",
        "Dip stuffed peppers in batter, fry until golden.",
        "Serve with tomato sauce."
      ]
    },
    { 
      id: 18, 
      name: "Tamales",
      tagline: "Corn dough stuffed with meat, steamed in corn husks",
      image: mexicanImages[17],
      pantryKeywords: ["masa harina", "pork", "chilies", "corn husks"],
      ingredients: [
        "For filling:",
        "500g pork shoulder, cooked and shredded",
        "2 dried guajillo chilies",
        "2 cloves garlic",
        "1 teaspoon cumin",
        "Salt",
        "For masa:",
        "2 cups masa harina",
        "1 cup lard or shortening",
        "1 teaspoon baking powder",
        "1 cup chicken broth",
        "Salt",
        "20 dried corn husks, soaked"
      ],
      steps: [
        "For filling: blend chilies with garlic, cumin, salt.",
        "Mix with shredded pork.",
        "For masa: beat lard until fluffy.",
        "Mix masa harina with baking powder, salt.",
        "Alternately add masa mixture and broth to lard.",
        "Beat until light and fluffy.",
        "Spread masa on corn husk, add filling, fold.",
        "Steam tamales for 1-1.5 hours.",
        "Let rest 10 minutes before serving."
      ]
    },
    { 
      id: 19, 
      name: "Pozole",
      tagline: "Traditional hominy and pork stew",
      image: mexicanImages[18],
      pantryKeywords: ["pork", "hominy", "chilies", "toppings"],
      ingredients: [
        "1 kg pork shoulder, cut into chunks",
        "500g pork neck bones",
        "2 cans hominy, drained",
        "4 dried guajillo chilies",
        "4 cloves garlic",
        "1 onion, quartered",
        "2 bay leaves",
        "Oregano",
        "Salt to taste",
        "For toppings:",
        "Shredded lettuce",
        "Radishes, sliced",
        "Onion, chopped",
        "Oregano",
        "Lime wedges",
        "Tostadas"
      ],
      steps: [
        "Cover pork with water, add onion, garlic, bay leaves, salt.",
        "Simmer for 2 hours until pork is tender.",
        "Remove pork, shred or cube, strain broth.",
        "Toast guajillo chilies, soak, blend with some broth.",
        "Add chili sauce and hominy to broth, simmer 30 minutes.",
        "Return pork to pot, heat through.",
        "Serve in bowls with all toppings."
      ]
    },
    { 
      id: 20, 
      name: "Menudo",
      tagline: "Hearty tripe and hominy soup",
      image: mexicanImages[19],
      pantryKeywords: ["beef tripe", "hominy", "chilies", "toppings"],
      ingredients: [
        "1 kg beef tripe, cleaned and cut into pieces",
        "2 cans hominy, drained",
        "4 dried guajillo chilies",
        "4 dried ancho chilies",
        "4 cloves garlic",
        "1 onion, quartered",
        "2 bay leaves",
        "Oregano",
        "Salt to taste",
        "For toppings:",
        "Onion, chopped",
        "Cilantro",
        "Oregano",
        "Lime wedges",
        "Chili flakes"
      ],
      steps: [
        "Cover tripe with water, add onion, garlic, bay leaves, salt.",
        "Simmer for 3-4 hours until tripe is tender.",
        "Toast chilies, soak, blend with some broth.",
        "Add chili sauce and hominy to pot.",
        "Simmer for 30 more minutes.",
        "Serve in bowls with all toppings."
      ]
    },
    { 
      id: 21, 
      name: "Chilaquiles",
      tagline: "Fried tortilla strips in salsa",
      image: mexicanImages[20],
      pantryKeywords: ["tortillas", "salsa", "eggs", "cheese"],
      ingredients: [
        "12 corn tortillas, cut into strips",
        "2 cups salsa roja or salsa verde",
        "4 eggs",
        "½ cup sour cream",
        "1 cup grated cheese (cotija or queso fresco)",
        "1 onion, sliced",
        "Oil for frying",
        "Fresh cilantro"
      ],
      steps: [
        "Heat oil, fry tortilla strips until crispy, drain.",
        "In separate pan, heat salsa until simmering.",
        "Add tortilla strips to salsa, toss to coat.",
        "Cook for 2-3 minutes until slightly softened.",
        "Fry eggs sunny side up.",
        "Serve chilaquiles topped with fried eggs.",
        "Garnish with cheese, sour cream, onion, cilantro."
      ]
    },

    // ========== RICE & BEANS (4) ==========
    { 
      id: 22, 
      name: "Mexican Rice",
      tagline: "Flavorful tomato rice",
      image: mexicanImages[21],
      pantryKeywords: ["rice", "tomato", "onion", "garlic"],
      ingredients: [
        "2 cups long-grain rice",
        "3 tomatoes",
        "1 onion",
        "2 cloves garlic",
        "¼ cup oil",
        "3 cups chicken broth",
        "1 teaspoon cumin",
        "Salt to taste",
        "Fresh cilantro"
      ],
      steps: [
        "Blend tomatoes, onion, garlic until smooth.",
        "Heat oil in pot, add rice, toast until golden.",
        "Add tomato mixture, cook until absorbed.",
        "Add broth, cumin, salt, bring to boil.",
        "Cover, reduce heat, simmer 20 minutes.",
        "Let rest 10 minutes, fluff with fork.",
        "Garnish with cilantro."
      ]
    },
    { 
      id: 23, 
      name: "Refried Beans",
      tagline: "Creamy mashed beans",
      image: mexicanImages[22],
      pantryKeywords: ["pinto beans", "onion", "garlic", "lard"],
      ingredients: [
        "500g pinto beans, soaked overnight",
        "1 onion",
        "4 cloves garlic",
        "2 bay leaves",
        "¼ cup lard or oil",
        "Salt to taste",
        "Queso fresco for topping"
      ],
      steps: [
        "Drain beans, cover with fresh water.",
        "Add onion, garlic, bay leaves, bring to boil.",
        "Simmer for 2-3 hours until beans are tender.",
        "Drain beans, reserve some cooking liquid.",
        "Heat lard in pan, add beans and mash.",
        "Add cooking liquid as needed for desired consistency.",
        "Season with salt, cook until creamy.",
        "Top with queso fresco."
      ]
    },
    { 
      id: 24, 
      name: "Arroz con Pollo",
      tagline: "Chicken and rice",
      image: mexicanImages[23],
      pantryKeywords: ["chicken", "rice", "tomato", "peas"],
      ingredients: [
        "4 chicken thighs",
        "2 cups rice",
        "3 tomatoes",
        "1 onion",
        "2 cloves garlic",
        "1 bell pepper",
        "1 cup peas",
        "4 cups chicken broth",
        "1 teaspoon cumin",
        "1 teaspoon oregano",
        "Salt and pepper",
        "Oil"
      ],
      steps: [
        "Season chicken with salt, pepper, brown in oil.",
        "Remove chicken, sauté onion, garlic, bell pepper.",
        "Blend tomatoes, add to pot, cook 5 minutes.",
        "Add rice, toast, add broth, cumin, oregano.",
        "Return chicken to pot, bring to boil.",
        "Cover, simmer 20-25 minutes until rice is done.",
        "Add peas, cook 5 more minutes.",
        "Let rest 10 minutes before serving."
      ]
    },
    { 
      id: 25, 
      name: "Frijoles Charros",
      tagline: "Cowboy beans with bacon",
      image: mexicanImages[24],
      pantryKeywords: ["pinto beans", "bacon", "chorizo", "tomato"],
      ingredients: [
        "500g pinto beans, soaked overnight",
        "200g bacon, diced",
        "200g chorizo, casing removed",
        "1 onion, chopped",
        "2 cloves garlic",
        "2 tomatoes, chopped",
        "2 jalapeños, sliced",
        "1 cup cilantro, chopped",
        "Salt to taste"
      ],
      steps: [
        "Cook beans with water until tender (about 2 hours).",
        "In separate pan, cook bacon until crispy.",
        "Add chorizo, cook until browned.",
        "Add onion, garlic, cook until soft.",
        "Add tomatoes, jalapeños, cook 5 minutes.",
        "Add meat mixture to beans, simmer 30 minutes.",
        "Stir in cilantro, serve hot."
      ]
    },

    // ========== SEAFOOD (5) ==========
    { 
      id: 26, 
      name: "Ceviche",
      tagline: "Fresh fish cured in citrus",
      image: mexicanImages[25],
      pantryKeywords: ["white fish", "lime", "tomato", "cilantro"],
      ingredients: [
        "500g fresh white fish, cubed",
        "1 cup lime juice",
        "1 cup lemon juice",
        "2 tomatoes, diced",
        "1 red onion, finely chopped",
        "1 jalapeño, minced",
        "1 cup cilantro, chopped",
        "1 avocado, diced",
        "Salt to taste",
        "Tostadas for serving"
      ],
      steps: [
        "Place fish in glass bowl, cover with citrus juices.",
        "Refrigerate for 2-4 hours until fish is opaque.",
        "Drain most of the juice.",
        "Add tomatoes, onion, jalapeño, cilantro.",
        "Gently fold in avocado, season with salt.",
        "Serve chilled with tostadas."
      ]
    },
    { 
      id: 27, 
      name: "Camarones al Mojo de Ajo",
      tagline: "Garlic shrimp",
      image: mexicanImages[26],
      pantryKeywords: ["shrimp", "garlic", "butter", "lime"],
      ingredients: [
        "500g large shrimp, peeled",
        "8 cloves garlic, sliced",
        "½ cup butter",
        "¼ cup olive oil",
        "2 tablespoons lime juice",
        "1 teaspoon chili flakes",
        "Fresh cilantro",
        "Salt and pepper",
        "Rice for serving"
      ],
      steps: [
        "Season shrimp with salt and pepper.",
        "Heat oil and butter in large pan.",
        "Add garlic, cook until fragrant (not brown).",
        "Add shrimp, cook 2-3 minutes each side.",
        "Add lime juice and chili flakes.",
        "Garnish with cilantro.",
        "Serve with rice."
      ]
    },
    { 
      id: 28, 
      name: "Pescado a la Veracruzana",
      tagline: "Veracruz-style fish",
      image: mexicanImages[27],
      pantryKeywords: ["fish", "tomato", "olives", "capers"],
      ingredients: [
        "4 white fish fillets",
        "For sauce:",
        "2 tablespoons oil",
        "1 onion, sliced",
        "3 cloves garlic",
        "4 tomatoes, chopped",
        "2 bay leaves",
        "1 teaspoon oregano",
        "½ cup green olives",
        "2 tablespoons capers",
        "2 jalapeños, sliced",
        "Salt and pepper"
      ],
      steps: [
        "Season fish with salt and pepper.",
        "Heat oil in pan, brown fish quickly, remove.",
        "In same pan, sauté onion until soft.",
        "Add garlic, cook 1 minute, add tomatoes.",
        "Add bay leaves, oregano, olives, capers, jalapeños.",
        "Simmer sauce for 10 minutes.",
        "Return fish to pan, spoon sauce over.",
        "Cover and cook 10 minutes until fish is done."
      ]
    },
    { 
      id: 29, 
      name: "Tacos de Pescado",
      tagline: "Baja-style fish tacos",
      image: mexicanImages[28],
      pantryKeywords: ["fish", "tortilla", "cabbage", "crema"],
      ingredients: [
        "500g white fish",
        "1 cup flour",
        "1 teaspoon baking powder",
        "1 cup beer",
        "1 egg",
        "Salt and pepper",
        "Oil for frying",
        "Corn tortillas",
        "Shredded cabbage",
        "Crema",
        "Pico de gallo",
        "Lime wedges"
      ],
      steps: [
        "Mix flour, baking powder, salt, pepper.",
        "Whisk in beer and egg until smooth.",
        "Cut fish into strips, dip in batter.",
        "Heat oil, fry fish until golden.",
        "Warm tortillas.",
        "Layer cabbage, fish, crema, pico de gallo.",
        "Serve with lime wedges."
      ]
    },
    { 
      id: 30, 
      name: "Cocktel de Camarones",
      tagline: "Mexican shrimp cocktail",
      image: mexicanImages[29],
      pantryKeywords: ["shrimp", "tomato", "avocado", "hot sauce"],
      ingredients: [
        "500g cooked shrimp, chilled",
        "For sauce:",
        "1 cup ketchup",
        "¼ cup lime juice",
        "¼ cup orange juice",
        "2 tablespoons hot sauce",
        "1 tablespoon Worcestershire sauce",
        "1 onion, finely chopped",
        "2 tomatoes, diced",
        "1 cucumber, diced",
        "1 avocado, diced",
        "Fresh cilantro",
        "Salt to taste",
        "Tostadas or saltine crackers"
      ],
      steps: [
        "Mix ketchup, lime juice, orange juice, hot sauce, Worcestershire.",
        "Add onion, tomatoes, cucumber, cilantro.",
        "Gently fold in shrimp and avocado.",
        "Season with salt.",
        "Chill for 30 minutes.",
        "Serve in cocktail glasses with tostadas."
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
      
      const scoredRecipes = mexicanRecipes.map(recipe => {
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
    <div className="mexican-page">
      {/* Header */}
      <header className="mexican-header">
        <div className="mexican-header-content">
          <h1 className="mexican-page-title">Mexican Cuisine</h1>
          <p className="mexican-page-description">
            ¡Viva México! Bold, spicy & vibrant flavors
          </p>
        </div>
      </header>

      {/* Pantry Suggestions - 2 Recipes */}
      {showSuggestions && (
        <div className="mexican-pantry-suggestions">
          <div className="mexican-suggestions-header">
            <i className="fas fa-lightbulb"></i>
            <h3>Based on your pantry, you can make:</h3>
          </div>
          <div className="mexican-suggestions-grid two-suggestions">
            {suggestedRecipes.map(recipe => (
              <div 
                key={`suggest-${recipe.id}`} 
                className="mexican-suggestion-card"
                onClick={() => applySuggestion(recipe)}
              >
                <div className="mexican-suggestion-image" style={{backgroundImage: `url(${recipe.image})`}}></div>
                <div className="mexican-suggestion-content">
                  <h4>{recipe.name}</h4>
                  <p>{recipe.tagline}</p>
                  <p className="mexican-match-info">✓ {recipe.score} items match your pantry</p>
                  <button className="mexican-suggestion-btn">Cook This</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipes Grid */}
      <main className="mexican-main">
        <div className="mexican-grid-section">
          <div className="mexican-grid">
            {mexicanRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="mexican-technique-card"
                onClick={() => handleRecipeSelect(recipe)}
              >
                <div 
                  className="mexican-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                
                <div className="mexican-card-content">
                  <h3 className="mexican-card-title">{recipe.name}</h3>
                  <p className="mexican-card-description">{recipe.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {showDetailPanel && selectedRecipe && (
        <div className="mexican-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="mexican-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="mexican-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="mexican-modal-header">
              <div className="mexican-modal-title">
                <h2>{selectedRecipe.name}</h2>
                <p>{selectedRecipe.tagline}</p>
              </div>
            </div>

            <div className="mexican-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="mexican-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="mexican-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="mexican-ingredient-item">
                      <span className="mexican-ingredient-bullet">•</span>
                      <span className="mexican-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="mexican-modal-steps">
                <h3>Steps to Make</h3>
                <div className="mexican-steps-list">
                  {selectedRecipe.steps.map((step, idx) => (
                    <div key={idx} className="mexican-step-item">
                      <span className="mexican-step-number">{idx + 1}.</span>
                      <span className="mexican-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="mexican-modal-voice-container">
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

export default MexicanCuisine;