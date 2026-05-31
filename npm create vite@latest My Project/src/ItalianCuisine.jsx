import React, { useState, useEffect, useRef } from 'react';
import './ItalianCuisine.css';

const ItalianCuisine = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pantryItems, setPantryItems] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const speechSynthesisRef = useRef(null);

  // Italian Cuisine images
  const italianImages = [
    // Pasta Dishes (8)
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500", // Spaghetti Carbonara
    "https://images.unsplash.com/photo-1556760544-74068565f05c?w=500", // Lasagna
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500", // Fettuccine Alfredo
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500", // Spaghetti Bolognese
    "https://images.unsplash.com/photo-1556760544-74068565f05c?w=500", // Ravioli
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500", // Pasta Pesto
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500", // Penne Arrabbiata
    "https://images.unsplash.com/photo-1556760544-74068565f05c?w=500", // Tortellini
    
    // Pizza (5)
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500", // Margherita Pizza
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500", // Pepperoni Pizza
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500", // Quattro Formaggi
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500", // Vegetarian Pizza
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500", // Diavola Pizza
    
    // Risotto (4)
    "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500", // Risotto Milanese
    "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500", // Mushroom Risotto
    "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500", // Seafood Risotto
    "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500", // Pumpkin Risotto
    
    // Chicken Dishes (4)
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500", // Chicken Parmesan
    "https://images.unsplash.com/photo-1604908176997-125f25c813e5?w=500", // Chicken Marsala
    "https://images.unsplash.com/photo-1624726175512-19b9baf9fbd1?w=500", // Chicken Cacciatore
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500", // Chicken Piccata
    
    // Veal & Meat Dishes (4)
    "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=500", // Osso Buco
    "https://images.unsplash.com/photo-1558030006-450675393462?w=500", // Veal Milanese
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500", // Saltimbocca
    "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500", // Bolognese Sauce
    
    // Seafood Dishes (5)
    "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500", // Grilled Salmon
    "https://images.unsplash.com/photo-1559847844-5315695dadae?w=500", // Shrimp Scampi
    "https://images.unsplash.com/photo-1586195611298-6c3c9c5c4d4c?w=500", // Clam Linguine
    "https://images.unsplash.com/photo-1604908176997-125f25c813e5?w=500", // Seafood Risotto
    "https://images.unsplash.com/photo-1551024707-872f23a1934e?w=500", // Grilled Fish
  ];

  // Complete Italian Cuisine Recipes (30 items - all main courses)
  const italianRecipes = [
    // ========== PASTA DISHES (8) ==========
    { 
      id: 1, 
      name: "Spaghetti Carbonara",
      tagline: "Classic Roman pasta with eggs and pancetta",
      image: italianImages[0],
      pantryKeywords: ["spaghetti", "eggs", "pancetta", "parmesan"],
      ingredients: [
        "400g spaghetti",
        "200g pancetta or guanciale, diced",
        "4 large eggs",
        "1 cup Pecorino Romano cheese, grated",
        "1 cup Parmesan cheese, grated",
        "Freshly ground black pepper",
        "Salt",
        "2 cloves garlic (optional)"
      ],
      steps: [
        "Bring large pot of salted water to boil.",
        "Cook spaghetti according to package until al dente.",
        "Meanwhile, cook pancetta in large pan until crispy.",
        "In a bowl, whisk eggs with both cheeses and lots of black pepper.",
        "Reserve 1 cup pasta water, drain pasta.",
        "Working quickly, add hot pasta to pan with pancetta, toss.",
        "Remove from heat, add egg mixture and toss rapidly.",
        "Add pasta water as needed for creamy sauce.",
        "Serve immediately with extra cheese and pepper."
      ]
    },
    { 
      id: 2, 
      name: "Lasagna",
      tagline: "Layered pasta with meat sauce and béchamel",
      image: italianImages[1],
      pantryKeywords: ["lasagna sheets", "beef mince", "tomato", "cheese"],
      ingredients: [
        "12 lasagna sheets",
        "For meat sauce:",
        "500g beef mince",
        "1 onion, finely chopped",
        "2 carrots, finely chopped",
        "2 celery stalks, finely chopped",
        "3 cloves garlic",
        "800g crushed tomatoes",
        "2 tablespoons tomato paste",
        "1 cup red wine",
        "1 teaspoon oregano",
        "Salt and pepper",
        "For béchamel:",
        "4 tablespoons butter",
        "¼ cup flour",
        "3 cups milk",
        "Pinch of nutmeg",
        "2 cups mozzarella",
        "1 cup Parmesan"
      ],
      steps: [
        "Sauté onion, carrot, celery until soft.",
        "Add garlic, cook 1 minute, add mince, brown.",
        "Add wine, reduce, add tomatoes, paste, oregano.",
        "Simmer for 1 hour, season with salt and pepper.",
        "Make béchamel: melt butter, add flour, cook 1 minute.",
        "Whisk in milk gradually, cook until thick, add nutmeg.",
        "Preheat oven to 180°C.",
        "Layer in dish: meat sauce, pasta, béchamel, mozzarella.",
        "Repeat layers, top with Parmesan.",
        "Bake 40 minutes, rest 15 minutes before serving."
      ]
    },
    { 
      id: 3, 
      name: "Fettuccine Alfredo",
      tagline: "Rich and creamy butter and cheese pasta",
      image: italianImages[2],
      pantryKeywords: ["fettuccine", "butter", "cream", "parmesan"],
      ingredients: [
        "500g fettuccine",
        "1 cup unsalted butter",
        "2 cups heavy cream",
        "2 cups Parmesan cheese, freshly grated",
        "Salt to taste",
        "Freshly ground black pepper",
        "Fresh parsley for garnish"
      ],
      steps: [
        "Cook fettuccine in salted water until al dente.",
        "Meanwhile, melt butter in large pan over medium heat.",
        "Add cream, simmer for 3-4 minutes.",
        "Gradually whisk in Parmesan until smooth and creamy.",
        "Season with salt and pepper.",
        "Drain pasta, reserve ½ cup pasta water.",
        "Add pasta to sauce, toss to coat, add pasta water if needed.",
        "Serve immediately with extra Parmesan and parsley."
      ]
    },
    { 
      id: 4, 
      name: "Spaghetti Bolognese",
      tagline: "Rich meat sauce from Bologna",
      image: italianImages[3],
      pantryKeywords: ["spaghetti", "beef mince", "tomato", "vegetables"],
      ingredients: [
        "500g spaghetti",
        "500g beef mince",
        "100g pancetta, diced",
        "1 onion, finely chopped",
        "2 carrots, finely chopped",
        "2 celery stalks, finely chopped",
        "3 cloves garlic",
        "800g crushed tomatoes",
        "2 tablespoons tomato paste",
        "1 cup red wine",
        "1 cup milk",
        "1 teaspoon oregano",
        "Salt and pepper",
        "Parmesan for serving"
      ],
      steps: [
        "Cook pancetta until fat renders, add vegetables.",
        "Sauté until soft, add garlic, cook 1 minute.",
        "Add mince, brown well.",
        "Add wine, reduce by half.",
        "Add tomatoes, paste, oregano, simmer 2 hours.",
        "Add milk, simmer 30 more minutes.",
        "Season with salt and pepper.",
        "Cook spaghetti, serve with sauce and Parmesan."
      ]
    },
    { 
      id: 5, 
      name: "Ravioli",
      tagline: "Stuffed pasta with sage butter sauce",
      image: italianImages[4],
      pantryKeywords: ["ravioli", "butter", "sage", "parmesan"],
      ingredients: [
        "500g cheese or spinach ravioli (fresh or frozen)",
        "½ cup unsalted butter",
        "10-12 fresh sage leaves",
        "½ cup Parmesan cheese, grated",
        "Salt and pepper",
        "Pine nuts for garnish (optional)"
      ],
      steps: [
        "Cook ravioli in salted water according to package.",
        "Meanwhile, melt butter in large pan over medium heat.",
        "Add sage leaves, cook until butter browns slightly.",
        "Drain ravioli, reserving ½ cup pasta water.",
        "Add ravioli to pan with sage butter, toss gently.",
        "Add pasta water if needed, season with salt and pepper.",
        "Serve with Parmesan and pine nuts."
      ]
    },
    { 
      id: 6, 
      name: "Pasta Pesto",
      tagline: "Fresh basil pesto with pasta",
      image: italianImages[5],
      pantryKeywords: ["pasta", "basil", "pine nuts", "parmesan"],
      ingredients: [
        "500g pasta (trofie or linguine)",
        "For pesto:",
        "2 cups fresh basil leaves",
        "½ cup pine nuts",
        "2 cloves garlic",
        "½ cup Parmesan cheese, grated",
        "½ cup extra virgin olive oil",
        "Salt to taste",
        "1 tablespoon lemon juice (optional)"
      ],
      steps: [
        "Make pesto: blend basil, pine nuts, garlic in food processor.",
        "With machine running, slowly add olive oil.",
        "Add Parmesan, pulse to combine, season with salt.",
        "Cook pasta in salted water until al dente.",
        "Reserve ½ cup pasta water, drain pasta.",
        "Toss pasta with pesto, add pasta water as needed.",
        "Serve with extra Parmesan."
      ]
    },
    { 
      id: 7, 
      name: "Penne Arrabbiata",
      tagline: "Spicy tomato sauce with garlic",
      image: italianImages[6],
      pantryKeywords: ["penne", "tomato", "garlic", "chili"],
      ingredients: [
        "500g penne pasta",
        "4 tablespoons olive oil",
        "4 cloves garlic, thinly sliced",
        "2-3 dried red chilies, crushed",
        "800g crushed tomatoes",
        "Salt to taste",
        "Fresh parsley, chopped",
        "Parmesan for serving"
      ],
      steps: [
        "Heat olive oil in large pan over medium heat.",
        "Add garlic and chilies, cook until garlic is golden.",
        "Add crushed tomatoes, salt, simmer for 15 minutes.",
        "Cook penne in salted water until al dente.",
        "Drain pasta, add to sauce, toss well.",
        "Cook for 1-2 minutes to combine.",
        "Garnish with parsley, serve with Parmesan."
      ]
    },
    { 
      id: 8, 
      name: "Tortellini",
      tagline: "Ring-shaped stuffed pasta in broth",
      image: italianImages[7],
      pantryKeywords: ["tortellini", "broth", "parmesan"],
      ingredients: [
        "500g cheese or meat tortellini",
        "4 cups chicken or vegetable broth",
        "2 tablespoons butter",
        "Fresh sage",
        "Parmesan cheese",
        "Salt and pepper"
      ],
      steps: [
        "Bring broth to simmer in large pot.",
        "Add tortellini, cook according to package.",
        "In small pan, melt butter with sage leaves.",
        "Serve tortellini in bowls with broth.",
        "Drizzle with sage butter.",
        "Top with Parmesan, season with pepper."
      ]
    },

    // ========== PIZZA (5) ==========
    { 
      id: 9, 
      name: "Margherita Pizza",
      tagline: "Simple classic with tomato, mozzarella, basil",
      image: italianImages[8],
      pantryKeywords: ["pizza dough", "tomato sauce", "mozzarella", "basil"],
      ingredients: [
        "1 pizza dough ball",
        "½ cup tomato sauce",
        "200g fresh mozzarella, sliced",
        "Fresh basil leaves",
        "2 tablespoons olive oil",
        "Salt to taste"
      ],
      steps: [
        "Preheat oven to 250°C (480°F) with pizza stone if possible.",
        "Roll out pizza dough into 12-inch circle.",
        "Spread tomato sauce evenly over dough.",
        "Arrange mozzarella slices on top.",
        "Drizzle with olive oil, sprinkle salt.",
        "Bake for 10-12 minutes until crust is golden.",
        "Top with fresh basil leaves.",
        "Slice and serve."
      ]
    },
    { 
      id: 10, 
      name: "Pepperoni Pizza",
      tagline: "Classic pizza with spicy pepperoni",
      image: italianImages[9],
      pantryKeywords: ["pizza dough", "tomato sauce", "mozzarella", "pepperoni"],
      ingredients: [
        "1 pizza dough ball",
        "½ cup tomato sauce",
        "200g mozzarella, grated",
        "100g pepperoni slices",
        "2 tablespoons olive oil",
        "Oregano to taste"
      ],
      steps: [
        "Preheat oven to 250°C (480°F).",
        "Roll out pizza dough.",
        "Spread tomato sauce evenly.",
        "Sprinkle mozzarella cheese.",
        "Arrange pepperoni slices on top.",
        "Drizzle with olive oil, sprinkle oregano.",
        "Bake for 10-12 minutes until crispy.",
        "Slice and serve."
      ]
    },
    { 
      id: 11, 
      name: "Quattro Formaggi",
      tagline: "Four cheese pizza",
      image: italianImages[10],
      pantryKeywords: ["pizza dough", "mozzarella", "gorgonzola", "parmesan"],
      ingredients: [
        "1 pizza dough ball",
        "2 tablespoons olive oil",
        "150g mozzarella, grated",
        "100g gorgonzola, crumbled",
        "100g fontina, sliced",
        "50g Parmesan, grated",
        "Fresh thyme (optional)"
      ],
      steps: [
        "Preheat oven to 250°C (480°F).",
        "Roll out pizza dough.",
        "Brush with olive oil.",
        "Scatter all cheeses evenly over dough.",
        "Bake for 10-12 minutes until cheese melts and bubbles.",
        "Garnish with fresh thyme if desired.",
        "Serve hot."
      ]
    },
    { 
      id: 12, 
      name: "Vegetarian Pizza",
      tagline: "Garden fresh vegetable pizza",
      image: italianImages[11],
      pantryKeywords: ["pizza dough", "tomato sauce", "mozzarella", "vegetables"],
      ingredients: [
        "1 pizza dough ball",
        "½ cup tomato sauce",
        "200g mozzarella, grated",
        "1 bell pepper, sliced",
        "1 red onion, sliced",
        "1 zucchini, sliced",
        "100g mushrooms, sliced",
        "Olive oil",
        "Oregano"
      ],
      steps: [
        "Preheat oven to 250°C (480°F).",
        "Roll out pizza dough.",
        "Spread tomato sauce.",
        "Sprinkle mozzarella.",
        "Arrange all vegetables on top.",
        "Drizzle with olive oil, sprinkle oregano.",
        "Bake for 12-15 minutes until vegetables are tender.",
        "Serve hot."
      ]
    },
    { 
      id: 13, 
      name: "Diavola Pizza",
      tagline: "Spicy pizza with salami and chili",
      image: italianImages[12],
      pantryKeywords: ["pizza dough", "tomato sauce", "mozzarella", "spicy salami"],
      ingredients: [
        "1 pizza dough ball",
        "½ cup tomato sauce",
        "200g mozzarella, grated",
        "100g spicy salami, sliced",
        "2 fresh red chilies, sliced",
        "Olive oil",
        "Chili flakes"
      ],
      steps: [
        "Preheat oven to 250°C (480°F).",
        "Roll out pizza dough.",
        "Spread tomato sauce.",
        "Sprinkle mozzarella.",
        "Arrange salami and chilies on top.",
        "Drizzle with olive oil, sprinkle chili flakes.",
        "Bake for 10-12 minutes.",
        "Serve hot."
      ]
    },

    // ========== RISOTTO (4) ==========
    { 
      id: 14, 
      name: "Risotto Milanese",
      tagline: "Creamy saffron risotto",
      image: italianImages[13],
      pantryKeywords: ["arborio rice", "saffron", "broth", "parmesan"],
      ingredients: [
        "2 cups arborio rice",
        "1 onion, finely chopped",
        "½ cup white wine",
        "6 cups hot chicken broth",
        "1 teaspoon saffron threads",
        "½ cup Parmesan cheese, grated",
        "4 tablespoons butter",
        "2 tablespoons olive oil",
        "Salt to taste"
      ],
      steps: [
        "Heat broth and keep warm.",
        "Soak saffron in ¼ cup hot broth.",
        "Sauté onion in oil and 2 tablespoons butter until soft.",
        "Add rice, toast for 2 minutes.",
        "Add wine, cook until absorbed.",
        "Add broth one ladle at a time, stirring constantly.",
        "Continue until rice is creamy and al dente (18-20 minutes).",
        "Stir in saffron broth, remaining butter, and Parmesan.",
        "Season with salt, rest for 2 minutes, serve."
      ]
    },
    { 
      id: 15, 
      name: "Mushroom Risotto",
      tagline: "Creamy risotto with wild mushrooms",
      image: italianImages[14],
      pantryKeywords: ["arborio rice", "mushrooms", "broth", "parmesan"],
      ingredients: [
        "2 cups arborio rice",
        "500g mixed mushrooms, sliced",
        "1 onion, finely chopped",
        "2 cloves garlic",
        "½ cup white wine",
        "6 cups hot vegetable broth",
        "½ cup Parmesan cheese",
        "4 tablespoons butter",
        "2 tablespoons olive oil",
        "Fresh parsley",
        "Salt and pepper"
      ],
      steps: [
        "Sauté mushrooms in oil until golden, remove.",
        "In same pan, sauté onion until soft.",
        "Add garlic, cook 1 minute, add rice, toast.",
        "Add wine, cook until absorbed.",
        "Add broth one ladle at a time, stirring constantly.",
        "Cook until rice is creamy (18-20 minutes).",
        "Stir in mushrooms, butter, Parmesan.",
        "Garnish with parsley, serve."
      ]
    },
    { 
      id: 16, 
      name: "Seafood Risotto",
      tagline: "Luxurious risotto with mixed seafood",
      image: italianImages[15],
      pantryKeywords: ["arborio rice", "seafood", "broth", "white wine"],
      ingredients: [
        "2 cups arborio rice",
        "300g shrimp, peeled",
        "200g scallops",
        "200g calamari, sliced",
        "1 onion, finely chopped",
        "2 cloves garlic",
        "½ cup white wine",
        "6 cups hot fish broth",
        "½ cup Parmesan",
        "4 tablespoons butter",
        "2 tablespoons olive oil",
        "Fresh parsley",
        "Salt and pepper"
      ],
      steps: [
        "Sauté seafood quickly in oil, remove.",
        "Sauté onion until soft, add garlic.",
        "Add rice, toast, add wine.",
        "Add broth one ladle at a time, stirring.",
        "Cook until rice is creamy (15 minutes).",
        "Add seafood, cook 5 more minutes.",
        "Stir in butter and Parmesan.",
        "Garnish with parsley, serve."
      ]
    },
    { 
      id: 17, 
      name: "Pumpkin Risotto",
      tagline: "Creamy autumn pumpkin risotto",
      image: italianImages[16],
      pantryKeywords: ["arborio rice", "pumpkin", "broth", "parmesan"],
      ingredients: [
        "2 cups arborio rice",
        "500g pumpkin, diced",
        "1 onion, chopped",
        "2 cloves garlic",
        "½ cup white wine",
        "6 cups hot vegetable broth",
        "½ cup Parmesan",
        "4 tablespoons butter",
        "2 tablespoons olive oil",
        "Fresh sage",
        "Salt and pepper"
      ],
      steps: [
        "Roast pumpkin with oil and sage until soft.",
        "Mash half the pumpkin, reserve rest.",
        "Sauté onion in oil, add garlic.",
        "Add rice, toast, add wine.",
        "Add broth one ladle at a time, stirring.",
        "Cook until creamy, stir in mashed pumpkin.",
        "Add remaining pumpkin, butter, Parmesan.",
        "Garnish with sage, serve."
      ]
    },

    // ========== CHICKEN DISHES (4) ==========
    { 
      id: 18, 
      name: "Chicken Parmesan",
      tagline: "Breaded chicken with tomato sauce and cheese",
      image: italianImages[17],
      pantryKeywords: ["chicken", "mozzarella", "tomato sauce", "breadcrumbs"],
      ingredients: [
        "4 chicken breasts",
        "1 cup flour",
        "2 eggs, beaten",
        "1 cup breadcrumbs",
        "½ cup Parmesan, grated",
        "2 cups marinara sauce",
        "2 cups mozzarella, grated",
        "Olive oil for frying",
        "Salt and pepper",
        "Fresh basil"
      ],
      steps: [
        "Pound chicken to even thickness, season.",
        "Dredge in flour, dip in egg, coat with breadcrumbs mixed with Parmesan.",
        "Heat oil, fry chicken until golden (3-4 minutes each side).",
        "Place in baking dish, top with marinara and mozzarella.",
        "Bake at 190°C (375°F) for 15-20 minutes.",
        "Garnish with basil, serve with pasta."
      ]
    },
    { 
      id: 19, 
      name: "Chicken Marsala",
      tagline: "Chicken in sweet Marsala wine sauce",
      image: italianImages[18],
      pantryKeywords: ["chicken", "mushrooms", "marsala wine"],
      ingredients: [
        "4 chicken breasts",
        "½ cup flour",
        "Salt and pepper",
        "3 tablespoons olive oil",
        "250g mushrooms, sliced",
        "3 cloves garlic",
        "1 cup Marsala wine",
        "½ cup chicken broth",
        "2 tablespoons butter",
        "Fresh parsley"
      ],
      steps: [
        "Pound chicken thin, season, dredge in flour.",
        "Heat oil, cook chicken 3-4 minutes each side, remove.",
        "Add mushrooms, cook until browned, add garlic.",
        "Add Marsala wine, scrape bottom, add broth.",
        "Simmer until sauce thickens.",
        "Return chicken, cook 5 minutes.",
        "Stir in butter, garnish with parsley."
      ]
    },
    { 
      id: 20, 
      name: "Chicken Cacciatore",
      tagline: "Hunter-style chicken with tomatoes and peppers",
      image: italianImages[19],
      pantryKeywords: ["chicken", "tomato", "bell pepper", "onion"],
      ingredients: [
        "4 chicken thighs and legs",
        "2 tablespoons olive oil",
        "1 onion, sliced",
        "2 bell peppers, sliced",
        "3 cloves garlic",
        "800g crushed tomatoes",
        "1 cup mushrooms, sliced",
        "½ cup white wine",
        "1 teaspoon oregano",
        "Fresh basil",
        "Salt and pepper"
      ],
      steps: [
        "Season chicken, brown in oil, remove.",
        "Sauté onion and peppers until soft.",
        "Add garlic, mushrooms, cook 2 minutes.",
        "Add wine, reduce, add tomatoes, oregano.",
        "Return chicken, cover, simmer 30 minutes.",
        "Uncover, cook 15 more minutes.",
        "Garnish with basil, serve."
      ]
    },
    { 
      id: 21, 
      name: "Chicken Piccata",
      tagline: "Lemon caper sauce over chicken",
      image: italianImages[20],
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
        "Pound chicken thin, season, dredge in flour.",
        "Heat oil and 2 tablespoons butter, cook chicken.",
        "Remove chicken, add broth, lemon juice, capers.",
        "Simmer until sauce reduces.",
        "Return chicken, cook 3 minutes.",
        "Stir in remaining butter, garnish with parsley."
      ]
    },

    // ========== VEAL & MEAT DISHES (4) ==========
    { 
      id: 22, 
      name: "Osso Buco",
      tagline: "Braised veal shanks in rich sauce",
      image: italianImages[21],
      pantryKeywords: ["veal shanks", "tomato", "wine", "vegetables"],
      ingredients: [
        "4 veal shanks",
        "Salt and pepper",
        "Flour for dredging",
        "4 tablespoons olive oil",
        "1 onion, chopped",
        "2 carrots, chopped",
        "2 celery stalks, chopped",
        "3 cloves garlic",
        "1 cup white wine",
        "2 cups beef broth",
        "400g crushed tomatoes",
        "1 bouquet garni",
        "For gremolata: lemon zest, garlic, parsley"
      ],
      steps: [
        "Season veal, dredge in flour, brown in oil.",
        "Remove veal, sauté vegetables until soft.",
        "Add garlic, cook 1 minute, add wine, reduce.",
        "Add broth, tomatoes, bouquet garni.",
        "Return veal, cover, simmer 2 hours.",
        "Mix gremolata ingredients.",
        "Serve veal with sauce and gremolata."
      ]
    },
    { 
      id: 23, 
      name: "Veal Milanese",
      tagline: "Breaded and fried veal cutlet",
      image: italianImages[22],
      pantryKeywords: ["veal", "breadcrumbs", "eggs", "lemon"],
      ingredients: [
        "4 veal cutlets",
        "1 cup flour",
        "2 eggs, beaten",
        "2 cups breadcrumbs",
        "½ cup Parmesan, grated",
        "Olive oil for frying",
        "Salt and pepper",
        "Lemon wedges",
        "Arugula for serving"
      ],
      steps: [
        "Pound veal to ¼-inch thickness, season.",
        "Set up dredging station: flour, eggs, breadcrumbs mixed with Parmesan.",
        "Dredge veal in flour, dip in egg, coat with breadcrumbs.",
        "Heat oil in large pan, fry cutlets 3-4 minutes each side.",
        "Drain on paper towels.",
        "Serve with lemon wedges and arugula."
      ]
    },
    { 
      id: 24, 
      name: "Saltimbocca",
      tagline: "Veal with prosciutto and sage",
      image: italianImages[23],
      pantryKeywords: ["veal", "prosciutto", "sage", "white wine"],
      ingredients: [
        "8 veal scaloppine",
        "8 slices prosciutto",
        "16 fresh sage leaves",
        "Flour for dredging",
        "4 tablespoons butter",
        "2 tablespoons olive oil",
        "½ cup white wine",
        "Salt and pepper"
      ],
      steps: [
        "Place sage leaf on each veal slice, top with prosciutto.",
        "Secure with toothpick, lightly dredge in flour.",
        "Heat oil and butter in pan, cook veal 2-3 minutes each side.",
        "Remove veal, add wine to pan, scrape bottom.",
        "Simmer until sauce reduces.",
        "Return veal to pan, heat through.",
        "Serve with sauce."
      ]
    },
    { 
      id: 25, 
      name: "Bolognese Sauce",
      tagline: "Rich meat sauce for pasta",
      image: italianImages[24],
      pantryKeywords: ["beef mince", "pancetta", "tomato", "milk"],
      ingredients: [
        "500g beef mince",
        "100g pancetta, diced",
        "1 onion, finely chopped",
        "2 carrots, finely chopped",
        "2 celery stalks, finely chopped",
        "3 cloves garlic",
        "800g crushed tomatoes",
        "2 tablespoons tomato paste",
        "1 cup red wine",
        "1 cup milk",
        "Olive oil",
        "Salt and pepper"
      ],
      steps: [
        "Cook pancetta in oil until fat renders.",
        "Add onion, carrot, celery, cook until soft.",
        "Add garlic, cook 1 minute, add mince, brown.",
        "Add wine, reduce by half.",
        "Add tomatoes, paste, simmer 2 hours.",
        "Add milk, simmer 30 minutes.",
        "Season, serve with pasta."
      ]
    },

    // ========== SEAFOOD DISHES (5) ==========
    { 
      id: 26, 
      name: "Grilled Salmon",
      tagline: "Simple grilled salmon with herbs",
      image: italianImages[25],
      pantryKeywords: ["salmon", "lemon", "olive oil", "herbs"],
      ingredients: [
        "4 salmon fillets",
        "4 tablespoons olive oil",
        "2 cloves garlic, minced",
        "1 tablespoon rosemary, chopped",
        "1 tablespoon thyme, chopped",
        "Salt and pepper",
        "Lemon wedges"
      ],
      steps: [
        "Mix oil, garlic, herbs, salt, pepper.",
        "Brush salmon with herb oil, marinate 30 minutes.",
        "Preheat grill or pan to medium-high.",
        "Cook salmon skin-side down 4-5 minutes.",
        "Flip, cook 3-4 more minutes.",
        "Serve with lemon wedges."
      ]
    },
    { 
      id: 27, 
      name: "Shrimp Scampi",
      tagline: "Garlic butter shrimp with white wine",
      image: italianImages[26],
      pantryKeywords: ["shrimp", "garlic", "butter", "white wine"],
      ingredients: [
        "500g large shrimp, peeled",
        "4 tablespoons butter",
        "2 tablespoons olive oil",
        "6 cloves garlic, minced",
        "½ cup white wine",
        "¼ cup lemon juice",
        "Fresh parsley",
        "Salt and pepper",
        "Red chili flakes (optional)"
      ],
      steps: [
        "Season shrimp with salt and pepper.",
        "Heat oil and 2 tablespoons butter in pan.",
        "Cook shrimp 1-2 minutes each side, remove.",
        "Add garlic, cook 1 minute, add wine and lemon juice.",
        "Simmer until reduced, add chili flakes.",
        "Return shrimp, add remaining butter, toss.",
        "Garnish with parsley, serve with bread."
      ]
    },
    { 
      id: 28, 
      name: "Clam Linguine",
      tagline: "Linguine with white wine clam sauce",
      image: italianImages[27],
      pantryKeywords: ["linguine", "clams", "garlic", "white wine"],
      ingredients: [
        "500g linguine",
        "2 kg fresh clams, scrubbed",
        "4 tablespoons olive oil",
        "6 cloves garlic, sliced",
        "½ cup white wine",
        "¼ cup parsley, chopped",
        "Red chili flakes",
        "Salt and pepper"
      ],
      steps: [
        "Cook linguine in salted water until al dente.",
        "Meanwhile, heat oil in large pan, add garlic and chili.",
        "Add clams and wine, cover, cook until clams open (5-7 minutes).",
        "Discard any unopened clams.",
        "Drain pasta, add to pan with clams.",
        "Toss with parsley, season with pepper.",
        "Serve immediately."
      ]
    },
    { 
      id: 29, 
      name: "Seafood Risotto",
      tagline: "Creamy risotto with mixed seafood",
      image: italianImages[28],
      pantryKeywords: ["arborio rice", "mixed seafood", "white wine", "broth"],
      ingredients: [
        "2 cups arborio rice",
        "300g mixed seafood (shrimp, scallops, calamari)",
        "1 onion, chopped",
        "2 cloves garlic",
        "½ cup white wine",
        "6 cups fish broth",
        "½ cup Parmesan",
        "4 tablespoons butter",
        "Olive oil",
        "Parsley",
        "Salt and pepper"
      ],
      steps: [
        "Sauté seafood quickly in oil, remove.",
        "Sauté onion until soft, add garlic.",
        "Add rice, toast, add wine.",
        "Add broth one ladle at a time, stirring.",
        "Cook until creamy (15 minutes).",
        "Add seafood, cook 5 more minutes.",
        "Stir in butter and Parmesan.",
        "Garnish with parsley."
      ]
    },
    { 
      id: 30, 
      name: "Grilled Fish",
      tagline: "Whole grilled fish with herbs",
      image: italianImages[29],
      pantryKeywords: ["whole fish", "herbs", "lemon", "olive oil"],
      ingredients: [
        "2 whole fish (sea bass or bream), cleaned",
        "4 tablespoons olive oil",
        "2 cloves garlic, sliced",
        "1 lemon, sliced",
        "Fresh herbs (rosemary, thyme, parsley)",
        "Salt and pepper"
      ],
      steps: [
        "Score fish on both sides, season inside and out.",
        "Stuff cavity with garlic, lemon slices, herbs.",
        "Brush with olive oil.",
        "Preheat grill to medium-high.",
        "Grill fish 6-8 minutes each side until cooked.",
        "Serve with lemon wedges."
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
      
      const scoredRecipes = italianRecipes.map(recipe => {
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
    <div className="italian-page">
      {/* Header */}
      <header className="italian-header">
        <div className="italian-header-content">
          <h1 className="italian-page-title">Italian Cuisine</h1>
          <p className="italian-page-description">
            La dolce vita - Pasta, pizza & Mediterranean flavors
          </p>
        </div>
      </header>

      {/* Pantry Suggestions - 2 Recipes */}
      {showSuggestions && (
        <div className="italian-pantry-suggestions">
          <div className="italian-suggestions-header">
            <i className="fas fa-lightbulb"></i>
            <h3>Based on your pantry, you can make:</h3>
          </div>
          <div className="italian-suggestions-grid two-suggestions">
            {suggestedRecipes.map(recipe => (
              <div 
                key={`suggest-${recipe.id}`} 
                className="italian-suggestion-card"
                onClick={() => applySuggestion(recipe)}
              >
                <div className="italian-suggestion-image" style={{backgroundImage: `url(${recipe.image})`}}></div>
                <div className="italian-suggestion-content">
                  <h4>{recipe.name}</h4>
                  <p>{recipe.tagline}</p>
                  <p className="italian-match-info">✓ {recipe.score} items match your pantry</p>
                  <button className="italian-suggestion-btn">Cook This</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipes Grid */}
      <main className="italian-main">
        <div className="italian-grid-section">
          <div className="italian-grid">
            {italianRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="italian-technique-card"
                onClick={() => handleRecipeSelect(recipe)}
              >
                <div 
                  className="italian-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                
                <div className="italian-card-content">
                  <h3 className="italian-card-title">{recipe.name}</h3>
                  <p className="italian-card-description">{recipe.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {showDetailPanel && selectedRecipe && (
        <div className="italian-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="italian-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="italian-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="italian-modal-header">
              <div className="italian-modal-title">
                <h2>{selectedRecipe.name}</h2>
                <p>{selectedRecipe.tagline}</p>
              </div>
            </div>

            <div className="italian-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="italian-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="italian-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="italian-ingredient-item">
                      <span className="italian-ingredient-bullet">•</span>
                      <span className="italian-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="italian-modal-steps">
                <h3>Steps to Make</h3>
                <div className="italian-steps-list">
                  {selectedRecipe.steps.map((step, idx) => (
                    <div key={idx} className="italian-step-item">
                      <span className="italian-step-number">{idx + 1}.</span>
                      <span className="italian-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="italian-modal-voice-container">
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

export default ItalianCuisine;