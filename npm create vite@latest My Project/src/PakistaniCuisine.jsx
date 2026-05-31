import React, { useState, useEffect, useRef } from 'react';
import './PakistaniCuisine.css';

const PakistaniCuisine = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pantryItems, setPantryItems] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const speechSynthesisRef = useRef(null);

  // Pakistani Cuisine images
  const pakistaniImages = [
    // Main Courses (12)
    "https://images.unsplash.com/photo-1589779262934-68e4c9d3b4c2?w=500", // Nihari
    "https://images.unsplash.com/photo-1627308595229-7830a5a91a9f?w=500", // Halwa Puri
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500", // Biryani
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500", // Karahi
    "https://images.unsplash.com/photo-1604908176997-125f25c813e5?w=500", // Handi
    "https://images.unsplash.com/photo-1545247181-516773c7e8a2?w=500", // Mutton Korma
    "https://images.unsplash.com/photo-1585937421612-70a008356c36?w=500", // Daal Chawal
    "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=500", // Keema
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500", // Chicken Pulao
    "https://images.unsplash.com/photo-1624374159000-2b2b2b2b2b2b?w=500", // Achar Gosht
    "https://images.unsplash.com/photo-1624374159310-2b2b2b2b2b2b?w=500", // Saag Gosht
    "https://images.unsplash.com/photo-1624374159620-2b2b2b2b2b2b?w=500", // Aloo Gosht
    
    // BBQ & Grills (6)
    "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500", // Seekh Kebab
    "https://images.unsplash.com/photo-1541529086526-db283c563270?w=500", // Chicken Tikka
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500", // Boti
    "https://images.unsplash.com/photo-1599487488173-50625e1d9ab5?w=500", // Chapli Kebab
    "https://images.unsplash.com/photo-1591522810852-1c8f5c4b9f9a?w=500", // Reshmi Kebab
    "https://images.unsplash.com/photo-1624374160000-2b2b2b2b2b2b?w=500", // Malai Boti
    
    // Street Food (5)
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500", // Bun Kebab
    "https://images.unsplash.com/photo-1624374159000-2b2b2b2b2b2b?w=500", // Samosa
    "https://images.unsplash.com/photo-1624374159310-2b2b2b2b2b2b?w=500", // Pakora
    "https://images.unsplash.com/photo-1624374159620-2b2b2b2b2b2b?w=500", // Chana Chaat
    "https://images.unsplash.com/photo-1624374159730-2b2b2b2b2b2b?w=500", // Gol Gappay
    
    // Rice Specialties (4)
    "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500", // Mutton Pulao
    "https://images.unsplash.com/photo-1624374159840-2b2b2b2b2b2b?w=500", // Chicken Yakhni Pulao
    "https://images.unsplash.com/photo-1624374159950-2b2b2b2b2b2b?w=500", // Kabuli Pulao
    "https://images.unsplash.com/photo-1624374160000-2b2b2b2b2b2b?w=500", // Sindhi Biryani
    
    // Sweets & Desserts (3)
    "https://images.unsplash.com/photo-1624374160100-2b2b2b2b2b2b?w=500", // Gulab Jamun
    "https://images.unsplash.com/photo-1624374160200-2b2b2b2b2b2b?w=500", // Kheer
    "https://images.unsplash.com/photo-1624374160300-2b2b2b2b2b2b?w=500", // Gajar ka Halwa
  ];

  // Complete Pakistani Cuisine Recipes (30 items - Breads replaced with meat dishes)
  const pakistaniRecipes = [
    // ========== MAIN COURSES (12) ==========
    { 
      id: 1, 
      name: "Nihari",
      tagline: "Slow-cooked beef stew - Karachi's pride",
      image: pakistaniImages[0],
      pantryKeywords: ["beef", "onion", "ginger", "garlic", "flour"],
      ingredients: [
        "1 kg beef shank",
        "¼ cup ghee",
        "2 onions, sliced",
        "2 tablespoons ginger garlic paste",
        "3 tablespoons nihari masala",
        "1 teaspoon red chili powder",
        "½ cup flour",
        "6 cups water",
        "Salt to taste",
        "Fresh cilantro, ginger for garnish",
        "Lemon wedges"
      ],
      steps: [
        "Heat ghee in pot, fry onions until golden brown.",
        "Add ginger garlic paste, sauté for 2 minutes.",
        "Add beef, sear until browned on all sides.",
        "Add nihari masala, chili powder, and salt.",
        "Add water, bring to boil.",
        "Cover and simmer on low heat for 4-5 hours until meat is tender.",
        "Mix flour with water to make smooth slurry.",
        "Add to nihari, cook for 15 minutes until thickened.",
        "Garnish with fresh cilantro and julienned ginger.",
        "Serve hot with naan or sheermal, lemon wedges on side."
      ]
    },
    { 
      id: 2, 
      name: "Halwa Puri",
      tagline: "Weekend breakfast special",
      image: pakistaniImages[1],
      pantryKeywords: ["flour", "suji", "sugar", "ghee", "oil"],
      ingredients: [
        "2 cups flour",
        "1 teaspoon salt",
        "½ cup oil",
        "Water for dough",
        "1 cup semolina (suji)",
        "½ cup ghee",
        "¾ cup sugar",
        "2 cups water",
        "½ teaspoon cardamom powder",
        "Oil for deep frying",
        "Aloo bhujia (potato curry) for serving"
      ],
      steps: [
        "Mix flour, salt, and oil. Add water gradually to make stiff dough.",
        "Cover and rest for 30 minutes.",
        "For halwa: heat ghee in pan, add semolina.",
        "Roast semolina on low heat until golden and fragrant.",
        "Add water slowly while stirring continuously.",
        "Add sugar and cardamom powder, mix well.",
        "Cook until halwa thickens and leaves sides of pan.",
        "Divide dough into small balls, roll into small circles.",
        "Heat oil, fry pooris until puffed and golden on both sides.",
        "Serve hot halwa with crispy pooris and aloo bhujia."
      ]
    },
    { 
      id: 3, 
      name: "Chicken Biryani",
      tagline: "Aromatic rice layered with spiced chicken",
      image: pakistaniImages[2],
      pantryKeywords: ["chicken", "rice", "yogurt", "onion", "spices"],
      ingredients: [
        "1 kg chicken, cut into pieces",
        "500g basmati rice",
        "2 cups yogurt",
        "4 onions, thinly sliced",
        "2 tablespoons ginger garlic paste",
        "2 teaspoons red chili powder",
        "1 teaspoon turmeric",
        "1 teaspoon cumin powder",
        "1 teaspoon coriander powder",
        "½ teaspoon garam masala",
        "4 tomatoes, chopped",
        "Fresh mint and cilantro",
        "4 green chilies",
        "½ cup oil",
        "Saffron soaked in milk",
        "Biryani masala",
        "Salt to taste"
      ],
      steps: [
        "Marinate chicken with yogurt, ginger garlic paste, red chili, turmeric, and salt for 2 hours.",
        "Fry sliced onions until golden brown, set aside half for garnish.",
        "In same oil, add marinated chicken and cook until half done.",
        "Add tomatoes, mint, cilantro, green chilies, and remaining spices.",
        "Cook until chicken is tender and oil separates.",
        "Boil rice with whole spices until 70% cooked, drain.",
        "Layer rice over chicken in pot.",
        "Sprinkle fried onions, mint, cilantro, and garam masala.",
        "Drizzle saffron milk and ghee.",
        "Seal pot with lid, cook on low heat (dum) for 20-25 minutes.",
        "Let it rest for 10 minutes before serving.",
        "Serve with raita and salad."
      ]
    },
    { 
      id: 4, 
      name: "Chicken Karahi",
      tagline: "Wok-cooked spicy chicken - Peshawari style",
      image: pakistaniImages[3],
      pantryKeywords: ["chicken", "tomato", "ginger", "garlic", "spices"],
      ingredients: [
        "1 kg chicken, cut into pieces",
        "½ cup oil",
        "6 tomatoes, chopped",
        "2 tablespoons ginger garlic paste",
        "4 green chilies, slit",
        "1 teaspoon red chili flakes",
        "1 teaspoon cumin seeds",
        "1 teaspoon coriander powder",
        "½ teaspoon black pepper",
        "Fresh ginger, julienned",
        "Fresh cilantro",
        "Salt to taste"
      ],
      steps: [
        "Heat oil in wok (karahi), add chicken and fry until golden.",
        "Add ginger garlic paste, cook for 2 minutes.",
        "Add tomatoes and salt, cook until tomatoes soften.",
        "Add red chili flakes, cumin, coriander powder, and black pepper.",
        "Cook on high heat until oil separates.",
        "Add green chilies, cook for 2 more minutes.",
        "Garnish with fresh ginger and cilantro.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 5, 
      name: "Chicken Handi",
      tagline: "Creamy and rich chicken curry",
      image: pakistaniImages[4],
      pantryKeywords: ["chicken", "cream", "yogurt", "spices", "ginger"],
      ingredients: [
        "1 kg chicken",
        "½ cup oil",
        "3 onions, finely chopped",
        "2 tablespoons ginger garlic paste",
        "2 teaspoons red chili powder",
        "1 teaspoon turmeric",
        "1 teaspoon cumin powder",
        "1 teaspoon coriander powder",
        "1 cup yogurt",
        "½ cup cream",
        "2 tablespoons almond paste",
        "Green chilies",
        "Fresh cilantro",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, fry onions until golden brown.",
        "Add ginger garlic paste, sauté for 2 minutes.",
        "Add chicken, fry until color changes.",
        "Add all spices and salt, cook for 5 minutes.",
        "Add yogurt and almond paste, mix well.",
        "Cover and cook on low heat until chicken is tender.",
        "Add cream and green chilies, cook for 5 more minutes.",
        "Garnish with fresh cilantro.",
        "Serve hot with naan or roti."
      ]
    },
    { 
      id: 6, 
      name: "Mutton Korma",
      tagline: "Royal Mughlai mutton curry",
      image: pakistaniImages[5],
      pantryKeywords: ["mutton", "yogurt", "onion", "spices", "ginger"],
      ingredients: [
        "1 kg mutton",
        "1 cup oil or ghee",
        "4 onions, thinly sliced",
        "2 tablespoons ginger garlic paste",
        "1 cup yogurt",
        "2 teaspoons red chili powder",
        "1 teaspoon turmeric",
        "2 teaspoons coriander powder",
        "1 teaspoon garam masala",
        "½ teaspoon nutmeg powder",
        "¼ cup fried onions (for garnish)",
        "Fresh cilantro",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, fry sliced onions until golden brown.",
        "Remove half for garnish, leave rest in oil.",
        "Add ginger garlic paste, sauté for 2 minutes.",
        "Add mutton, fry until browned.",
        "Add all spices and salt, cook for 5 minutes.",
        "Add yogurt gradually, stirring continuously.",
        "Add 1 cup warm water, cover and cook until mutton is tender.",
        "Sprinkle garam masala and nutmeg.",
        "Garnish with fried onions and cilantro.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 7, 
      name: "Daal Chawal",
      tagline: "Comfort food - lentils with rice",
      image: pakistaniImages[6],
      pantryKeywords: ["daal", "rice", "onion", "spices", "ginger"],
      ingredients: [
        "1 cup masoor daal (red lentils)",
        "2 cups basmati rice",
        "1 onion, sliced",
        "2 tomatoes, chopped",
        "1 tablespoon ginger garlic paste",
        "1 teaspoon cumin seeds",
        "1 teaspoon red chili powder",
        "½ teaspoon turmeric",
        "Green chilies",
        "Fresh cilantro",
        "Salt to taste",
        "¼ cup oil",
        "Whole spices for rice: cinnamon, cardamom, cloves"
      ],
      steps: [
        "Wash daal and soak for 30 minutes.",
        "Pressure cook daal with turmeric and salt until soft.",
        "Heat oil, add cumin seeds and whole spices.",
        "Add onion, fry until golden.",
        "Add ginger garlic paste and tomatoes, cook well.",
        "Add boiled daal, red chili, and simmer for 10 minutes.",
        "For rice: boil water with whole spices and salt.",
        "Add rice, cook until done, drain.",
        "Garnish daal with green chilies and cilantro.",
        "Serve hot daal with rice and fried onions."
      ]
    },
    { 
      id: 8, 
      name: "Keema Matar",
      tagline: "Minced meat with peas",
      image: pakistaniImages[7],
      pantryKeywords: ["mince", "peas", "onion", "tomato", "spices"],
      ingredients: [
        "500g beef or chicken mince",
        "1 cup peas",
        "2 onions, finely chopped",
        "2 tomatoes, chopped",
        "1 tablespoon ginger garlic paste",
        "1 teaspoon cumin seeds",
        "1 teaspoon coriander powder",
        "½ teaspoon turmeric",
        "1 teaspoon red chili powder",
        "1 teaspoon garam masala",
        "Green chilies",
        "Fresh cilantro",
        "Salt to taste",
        "¼ cup oil"
      ],
      steps: [
        "Heat oil, add cumin seeds.",
        "Add onions, fry until golden brown.",
        "Add ginger garlic paste, sauté for 2 minutes.",
        "Add mince, cook until browned, breaking lumps.",
        "Add tomatoes and all spices, cook until tomatoes soften.",
        "Add peas and ½ cup water, cover and cook until mince is done.",
        "Cook until oil separates and water dries.",
        "Add garam masala, green chilies, and cilantro.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 9, 
      name: "Achar Gosht",
      tagline: "Tangy pickling-spiced mutton curry",
      image: pakistaniImages[9],
      pantryKeywords: ["mutton", "achar masala", "onion", "ginger", "garlic"],
      ingredients: [
        "1 kg mutton",
        "½ cup oil",
        "3 onions, sliced",
        "2 tablespoons ginger garlic paste",
        "2 tablespoons achar masala (pickle masala)",
        "1 teaspoon red chili powder",
        "½ teaspoon turmeric",
        "1 teaspoon cumin seeds",
        "1 teaspoon fenugreek seeds",
        "½ cup yogurt",
        "2 tablespoons mustard oil",
        "Salt to taste",
        "Fresh cilantro"
      ],
      steps: [
        "Heat oil, add cumin and fenugreek seeds.",
        "Add onions, fry until golden brown.",
        "Add ginger garlic paste, sauté for 2 minutes.",
        "Add mutton, fry until browned.",
        "Add achar masala, red chili, turmeric, and salt.",
        "Cook for 5 minutes, add yogurt and mix well.",
        "Add 1 cup warm water, cover and cook until mutton is tender.",
        "Drizzle mustard oil on top.",
        "Garnish with fresh cilantro.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 10, 
      name: "Saag Gosht",
      tagline: "Mustard greens with tender mutton",
      image: pakistaniImages[10],
      pantryKeywords: ["mutton", "saag", "spinach", "ginger", "spices"],
      ingredients: [
        "1 kg mutton",
        "1 kg mustard greens (saag)",
        "250g spinach",
        "2 onions, chopped",
        "2 tablespoons ginger garlic paste",
        "2 green chilies",
        "1 teaspoon red chili powder",
        "1 teaspoon turmeric",
        "1 teaspoon cumin powder",
        "1 teaspoon coriander powder",
        "2 tablespoons cornmeal (makai ka atta)",
        "½ cup ghee",
        "Salt to taste"
      ],
      steps: [
        "Boil mutton with salt and ginger until tender, reserve stock.",
        "Wash and chop greens, boil until soft, blend to coarse paste.",
        "Heat ghee, fry onions until golden.",
        "Add ginger garlic paste and chilies, sauté.",
        "Add boiled mutton and fry for 5 minutes.",
        "Add all spices and cook for 2 minutes.",
        "Add saag paste and mutton stock, simmer for 20 minutes.",
        "Sprinkle cornmeal, cook for 10 more minutes.",
        "Serve hot with makai ki roti."
      ]
    },
    { 
      id: 11, 
      name: "Aloo Gosht",
      tagline: "Classic potato and mutton curry",
      image: pakistaniImages[11],
      pantryKeywords: ["mutton", "potato", "onion", "tomato", "spices"],
      ingredients: [
        "1 kg mutton",
        "4 potatoes, peeled and halved",
        "3 onions, sliced",
        "2 tomatoes, chopped",
        "2 tablespoons ginger garlic paste",
        "1 teaspoon cumin seeds",
        "1 teaspoon coriander powder",
        "1 teaspoon red chili powder",
        "½ teaspoon turmeric",
        "1 teaspoon garam masala",
        "Fresh cilantro",
        "Salt to taste",
        "½ cup oil"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions.",
        "Fry onions until golden brown.",
        "Add ginger garlic paste, sauté for 2 minutes.",
        "Add mutton, fry until browned.",
        "Add tomatoes and all spices, cook for 5 minutes.",
        "Add 2 cups water, cover and cook until mutton is half done.",
        "Add potatoes, cook until mutton and potatoes are tender.",
        "Sprinkle garam masala and cilantro.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 12, 
      name: "Chicken Pulao",
      tagline: "Fragrant rice with chicken",
      image: pakistaniImages[8],
      pantryKeywords: ["chicken", "rice", "onion", "spices", "yogurt"],
      ingredients: [
        "500g chicken",
        "500g basmati rice",
        "2 onions, sliced",
        "1 cup yogurt",
        "2 tablespoons ginger garlic paste",
        "1 teaspoon cumin seeds",
        "4 cloves",
        "2 cardamom pods",
        "1 cinnamon stick",
        "1 teaspoon black pepper",
        "Fresh mint and cilantro",
        "Green chilies",
        "Salt to taste",
        "½ cup oil"
      ],
      steps: [
        "Heat oil, add whole spices and onions.",
        "Fry onions until golden brown.",
        "Add ginger garlic paste, sauté for 2 minutes.",
        "Add chicken, fry until color changes.",
        "Add yogurt and salt, cook until chicken is half done.",
        "Add water (1:1.5 ratio for rice), bring to boil.",
        "Add soaked rice, mint, cilantro, and green chilies.",
        "Cook on high heat until water absorbs.",
        "Lower heat, cover and steam (dum) for 15 minutes.",
        "Serve hot with raita."
      ]
    },

    // ========== BBQ & GRILLS (6) ==========
    { 
      id: 13, 
      name: "Seekh Kebabs",
      tagline: "Spiced minced meat on skewers",
      image: pakistaniImages[12],
      pantryKeywords: ["mince", "onion", "spices", "ginger", "garlic"],
      ingredients: [
        "500g beef mince",
        "1 onion, finely chopped",
        "2 tablespoons ginger garlic paste",
        "2 green chilies, chopped",
        "1 teaspoon red chili powder",
        "1 teaspoon cumin powder",
        "1 teaspoon coriander powder",
        "½ teaspoon garam masala",
        "Fresh cilantro, chopped",
        "1 tablespoon roasted chickpea flour",
        "1 egg (optional)",
        "Salt to taste",
        "Oil for basting"
      ],
      steps: [
        "Mix all ingredients in a bowl thoroughly.",
        "Cover and refrigerate for 2 hours.",
        "Take mixture, mold onto skewers in sausage shape.",
        "Preheat grill or oven to 200°C.",
        "Grill kebabs, turning occasionally, basting with oil.",
        "Cook until browned and cooked through (12-15 minutes).",
        "Alternatively, cook on tawa with oil.",
        "Serve hot with mint chutney and onions."
      ]
    },
    { 
      id: 14, 
      name: "Chicken Tikka",
      tagline: "Spicy grilled chicken pieces",
      image: pakistaniImages[13],
      pantryKeywords: ["chicken", "yogurt", "spices", "ginger", "garlic"],
      ingredients: [
        "1 kg chicken legs or breast pieces",
        "1 cup yogurt",
        "2 tablespoons ginger garlic paste",
        "2 teaspoons red chili powder",
        "1 teaspoon turmeric",
        "1 teaspoon cumin powder",
        "1 teaspoon coriander powder",
        "1 teaspoon garam masala",
        "2 tablespoons lemon juice",
        "2 tablespoons oil",
        "Salt to taste",
        "Chat masala for sprinkling"
      ],
      steps: [
        "Make deep cuts in chicken pieces.",
        "Mix all marinade ingredients in a bowl.",
        "Add chicken, coat well with marinade.",
        "Cover and refrigerate overnight or at least 6 hours.",
        "Preheat grill or oven to 200°C.",
        "Arrange chicken on grill rack or baking tray.",
        "Grill for 20-25 minutes, turning halfway.",
        "Baste with oil for moisture.",
        "Cook until charred spots appear.",
        "Sprinkle chat masala and serve with onions and chutney."
      ]
    },
    { 
      id: 15, 
      name: "Boti Kebabs",
      tagline: "Tender marinated meat cubes",
      image: pakistaniImages[14],
      pantryKeywords: ["beef", "yogurt", "papaya", "spices"],
      ingredients: [
        "500g beef tenderloin, cubed",
        "½ cup yogurt",
        "2 tablespoons ginger garlic paste",
        "2 teaspoons red chili powder",
        "1 teaspoon cumin powder",
        "1 teaspoon coriander powder",
        "½ teaspoon garam masala",
        "2 tablespoons papaya paste (optional)",
        "2 tablespoons oil",
        "Salt to taste"
      ],
      steps: [
        "Mix all marinade ingredients thoroughly.",
        "Add beef cubes, coat well.",
        "Cover and marinate for 4-6 hours.",
        "Thread cubes onto skewers.",
        "Grill on high heat, turning frequently.",
        "Baste with oil or butter.",
        "Cook until desired doneness (8-10 minutes).",
        "Serve hot with naan and raita."
      ]
    },
    { 
      id: 16, 
      name: "Chapli Kebabs",
      tagline: "Peshawari-style minced meat patties",
      image: pakistaniImages[15],
      pantryKeywords: ["mince", "tomato", "spices", "coriander", "pomegranate"],
      ingredients: [
        "500g beef mince",
        "2 tomatoes, finely chopped",
        "2 onions, finely chopped",
        "2 tablespoons ginger garlic paste",
        "2 green chilies, chopped",
        "1 teaspoon red chili flakes",
        "1 teaspoon cumin seeds",
        "1 teaspoon coriander seeds, crushed",
        "½ teaspoon garam masala",
        "1 tablespoon pomegranate seeds (anardana)",
        "Fresh cilantro",
        "1 egg",
        "¼ cup flour or cornflour",
        "Salt to taste",
        "Oil for frying"
      ],
      steps: [
        "Mix all ingredients except oil in a bowl.",
        "Knead well for 5-10 minutes.",
        "Cover and rest for 1 hour.",
        "Take portions, flatten into patties.",
        "Heat oil in pan, shallow fry patties.",
        "Cook on medium heat until golden both sides.",
        "Press slightly while cooking.",
        "Serve hot with naan and yogurt."
      ]
    },
    { 
      id: 17, 
      name: "Reshmi Kebabs",
      tagline: "Silky smooth creamy chicken kebabs",
      image: pakistaniImages[16],
      pantryKeywords: ["chicken", "cream", "cheese", "spices"],
      ingredients: [
        "500g chicken mince",
        "¼ cup cream",
        "2 tablespoons cream cheese",
        "2 tablespoons ginger garlic paste",
        "2 green chilies, chopped",
        "1 teaspoon white pepper",
        "½ teaspoon cardamom powder",
        "Fresh cilantro",
        "Salt to taste",
        "Oil for basting"
      ],
      steps: [
        "Mix all ingredients in a bowl thoroughly.",
        "Cover and refrigerate for 2-3 hours.",
        "Take mixture, mold onto skewers.",
        "Preheat grill or oven to 180°C.",
        "Grill kebabs, turning and basting with oil.",
        "Cook for 12-15 minutes until cooked.",
        "Serve hot with mint chutney."
      ]
    },
    { 
      id: 18, 
      name: "Malai Boti",
      tagline: "Creamy white chicken boti",
      image: pakistaniImages[17],
      pantryKeywords: ["chicken", "cream", "cheese", "spices"],
      ingredients: [
        "500g chicken breast, cubed",
        "½ cup cream",
        "2 tablespoons cream cheese",
        "2 tablespoons ginger garlic paste",
        "1 teaspoon white pepper",
        "1 teaspoon green chili paste",
        "1 tablespoon lemon juice",
        "Salt to taste",
        "Oil for basting"
      ],
      steps: [
        "Mix all marinade ingredients thoroughly.",
        "Add chicken, coat well.",
        "Cover and marinate for 4-6 hours.",
        "Thread chicken onto skewers.",
        "Grill on medium heat, basting with oil.",
        "Cook until chicken is done and slightly charred.",
        "Serve hot with naan and raita."
      ]
    },

    // ========== STREET FOOD (5) ==========
    { 
      id: 19, 
      name: "Bun Kebab",
      tagline: "Karachi's famous street burger",
      image: pakistaniImages[18],
      pantryKeywords: ["bun", "shami kebab", "onion", "chutney", "egg"],
      ingredients: [
        "4 buns",
        "4 shami kebabs",
        "1 onion, sliced",
        "Green chutney",
        "Ketchup",
        "2 eggs, beaten",
        "Oil for frying",
        "Chat masala"
      ],
      steps: [
        "Fry shami kebabs until hot and crispy.",
        "Dip buns in beaten egg, fry until golden (optional).",
        "Spread green chutney on bottom bun.",
        "Place shami kebab, onion slices.",
        "Drizzle ketchup, sprinkle chat masala.",
        "Cover with top bun.",
        "Serve hot with extra chutney."
      ]
    },
    { 
      id: 20, 
      name: "Samosa",
      tagline: "Crispy triangle of spicy filling",
      image: pakistaniImages[19],
      pantryKeywords: ["samosa wrappers", "potato", "peas", "spices"],
      ingredients: [
        "20 samosa wrappers",
        "4 potatoes, boiled and mashed",
        "1 cup peas",
        "2 green chilies, chopped",
        "1 teaspoon cumin seeds",
        "1 teaspoon coriander powder",
        "½ teaspoon red chili powder",
        "1 teaspoon chaat masala",
        "Fresh cilantro",
        "Salt to taste",
        "Oil for deep frying",
        "Flour paste for sealing"
      ],
      steps: [
        "Heat little oil, add cumin seeds.",
        "Add peas, cook for 2-3 minutes.",
        "Add mashed potatoes and all spices.",
        "Add cilantro, mix well, cool filling.",
        "Take samosa wrapper, fold into cone.",
        "Fill with potato mixture, seal edges with flour paste.",
        "Heat oil, deep fry until golden brown.",
        "Serve hot with chutney."
      ]
    },
    { 
      id: 21, 
      name: "Pakoras",
      tagline: "Crispy onion and potato fritters",
      image: pakistaniImages[20],
      pantryKeywords: ["onion", "potato", "besan", "spices", "oil"],
      ingredients: [
        "2 onions, thinly sliced",
        "2 potatoes, thinly sliced",
        "2 cups besan (chickpea flour)",
        "2 teaspoons red chili powder",
        "1 teaspoon turmeric",
        "1 teaspoon cumin seeds",
        "1 teaspoon ajwain (carom seeds)",
        "Salt to taste",
        "Water as needed",
        "Oil for deep frying",
        "Fresh cilantro, chopped"
      ],
      steps: [
        "Mix besan with all spices, add water to make thick batter.",
        "Add onions, potatoes, and cilantro to batter.",
        "Mix well, let rest for 10 minutes.",
        "Heat oil for deep frying.",
        "Drop spoonfuls of mixture into hot oil.",
        "Fry until golden brown and crispy.",
        "Drain on paper towels.",
        "Serve hot with mint chutney and ketchup."
      ]
    },
    { 
      id: 22, 
      name: "Chana Chaat",
      tagline: "Spicy chickpea street snack",
      image: pakistaniImages[21],
      pantryKeywords: ["chickpeas", "onion", "tomato", "chaat masala"],
      ingredients: [
        "2 cups boiled chickpeas",
        "1 onion, finely chopped",
        "2 tomatoes, chopped",
        "2 green chilies, chopped",
        "1 teaspoon chaat masala",
        "½ teaspoon cumin powder",
        "¼ teaspoon red chili powder",
        "2 tablespoons lemon juice",
        "Fresh cilantro",
        "Salt to taste",
        "Imli chutney (optional)"
      ],
      steps: [
        "In a bowl, combine boiled chickpeas.",
        "Add onion, tomatoes, and green chilies.",
        "Sprinkle chaat masala, cumin, red chili, and salt.",
        "Add lemon juice and mix well.",
        "Drizzle imli chutney if desired.",
        "Garnish with fresh cilantro.",
        "Serve immediately in paper cones."
      ]
    },
    { 
      id: 23, 
      name: "Gol Gappay",
      tagline: "Crisp puris with spicy tangy water",
      image: pakistaniImages[22],
      pantryKeywords: ["gol gappa", "potato", "chickpeas", "tamarind"],
      ingredients: [
        "20 gol gappa puris",
        "2 potatoes, boiled and diced",
        "1 cup boiled chickpeas",
        "1 onion, finely chopped",
        "For imli chutney: tamarind, dates, jaggery",
        "For spicy water: mint, coriander, green chilies, chaat masala",
        "1 liter water",
        "Salt to taste"
      ],
      steps: [
        "For spicy water: blend mint, coriander, green chilies with water.",
        "Strain, add chaat masala, cumin, black salt, and regular salt.",
        "For imli chutney: boil tamarind with dates, strain, add jaggery and spices.",
        "Make a small hole in each puri.",
        "Fill with potato, chickpeas, and onion.",
        "Add a drop of imli chutney.",
        "Dip in spicy water and eat immediately."
      ]
    },

    // ========== RICE SPECIALTIES (4) ==========
    { 
      id: 24, 
      name: "Mutton Pulao",
      tagline: "Fragrant rice with tender mutton",
      image: pakistaniImages[23],
      pantryKeywords: ["mutton", "rice", "onion", "spices", "yogurt"],
      ingredients: [
        "500g mutton",
        "500g basmati rice",
        "2 onions, sliced",
        "1 cup yogurt",
        "2 tablespoons ginger garlic paste",
        "1 teaspoon cumin seeds",
        "4 cloves",
        "2 cardamom pods",
        "1 cinnamon stick",
        "1 teaspoon black pepper",
        "Fresh mint",
        "Salt to taste",
        "½ cup oil"
      ],
      steps: [
        "Heat oil, add whole spices and onions.",
        "Fry onions until golden brown, remove half for garnish.",
        "Add ginger garlic paste, sauté.",
        "Add mutton, fry until browned.",
        "Add yogurt and salt, cook until mutton is half done.",
        "Add water (1:1.5 ratio for rice), bring to boil.",
        "Add soaked rice and mint.",
        "Cook on high heat until water absorbs.",
        "Lower heat, cover and steam (dum) for 20 minutes.",
        "Garnish with fried onions, serve with raita."
      ]
    },
    { 
      id: 25, 
      name: "Chicken Yakhni Pulao",
      tagline: "Fragrant rice cooked in chicken stock",
      image: pakistaniImages[24],
      pantryKeywords: ["chicken", "rice", "onion", "spices"],
      ingredients: [
        "500g chicken",
        "500g basmati rice",
        "2 onions, sliced",
        "2 tablespoons ginger garlic paste",
        "1 teaspoon cumin seeds",
        "4 cloves",
        "2 cardamom pods",
        "1 cinnamon stick",
        "1 teaspoon black pepper",
        "Fresh mint and cilantro",
        "Salt to taste",
        "½ cup oil"
      ],
      steps: [
        "For yakhni: boil chicken with whole spices, ginger garlic, and salt.",
        "Remove chicken, strain stock.",
        "Heat oil, fry onions until golden, set aside half.",
        "Add boiled chicken, fry for 5 minutes.",
        "Add rice and measured yakhni (1:1.5 ratio).",
        "Cook on high heat until water absorbs.",
        "Lower heat, cover and steam for 15 minutes.",
        "Garnish with fried onions, mint, and cilantro.",
        "Serve hot with raita."
      ]
    },
    { 
      id: 26, 
      name: "Kabuli Pulao",
      tagline: "Afghani-style rice with carrots and raisins",
      image: pakistaniImages[25],
      pantryKeywords: ["mutton", "rice", "carrot", "raisins", "nuts"],
      ingredients: [
        "500g mutton",
        "500g basmati rice",
        "2 carrots, julienned",
        "½ cup raisins",
        "½ cup almonds",
        "2 onions, sliced",
        "2 tablespoons ginger garlic paste",
        "1 teaspoon cumin seeds",
        "4 cloves",
        "2 cardamom pods",
        "1 cinnamon stick",
        "Sugar to taste",
        "Salt to taste",
        "½ cup oil"
      ],
      steps: [
        "Boil mutton with whole spices until tender, reserve stock.",
        "Fry onions until golden, set aside.",
        "Fry carrots until soft, add raisins and sugar.",
        "Heat oil, add whole spices and ginger garlic paste.",
        "Add boiled mutton, fry for 5 minutes.",
        "Add rice and mutton stock (1:1.5 ratio).",
        "Cook until rice is done.",
        "Top with fried carrots, raisins, almonds, and onions.",
        "Cover and steam for 10 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 27, 
      name: "Sindhi Biryani",
      tagline: "Spicy biryani with potatoes",
      image: pakistaniImages[26],
      pantryKeywords: ["chicken", "rice", "potato", "yogurt", "spices"],
      ingredients: [
        "1 kg chicken",
        "500g basmati rice",
        "4 potatoes, sliced",
        "2 cups yogurt",
        "4 onions, sliced",
        "2 tablespoons ginger garlic paste",
        "2 teaspoons red chili powder",
        "1 teaspoon turmeric",
        "1 teaspoon cumin powder",
        "1 teaspoon coriander powder",
        "Sindhi biryani masala",
        "Fresh mint and cilantro",
        "Green chilies",
        "½ cup oil",
        "Salt to taste"
      ],
      steps: [
        "Marinate chicken with yogurt, spices, and ginger garlic paste.",
        "Fry sliced potatoes until golden, set aside.",
        "Fry onions until golden, set aside half.",
        "Add marinated chicken to remaining onions, cook until half done.",
        "Boil rice with whole spices until 70% done.",
        "Layer in pot: rice, chicken, potatoes, fried onions, mint.",
        "Repeat layers, ending with rice.",
        "Drizzle saffron milk and ghee.",
        "Seal and cook on low heat (dum) for 25 minutes.",
        "Serve hot with raita."
      ]
    },

    // ========== SWEETS & DESSERTS (3) ==========
    { 
      id: 28, 
      name: "Gulab Jamun",
      tagline: "Soft milk solids balls in sugar syrup",
      image: pakistaniImages[27],
      pantryKeywords: ["khoya", "flour", "sugar", "cardamom"],
      ingredients: [
        "2 cups khoya (mawa)",
        "¼ cup flour",
        "¼ teaspoon baking soda",
        "2 cups sugar",
        "2 cups water",
        "4 cardamom pods",
        "Few saffron strands",
        "1 teaspoon rose water",
        "Oil for deep frying"
      ],
      steps: [
        "For syrup: boil sugar, water, cardamom until sticky.",
        "Add rose water and saffron, keep warm.",
        "Mash khoya until smooth, add flour and baking soda.",
        "Knead soft dough, rest for 10 minutes.",
        "Make small smooth balls, no cracks.",
        "Heat oil on low heat, fry balls until golden brown.",
        "Add hot fried balls to warm syrup.",
        "Soak for at least 2 hours before serving.",
        "Serve warm or at room temperature."
      ]
    },
    { 
      id: 29, 
      name: "Kheer",
      tagline: "Creamy rice pudding",
      image: pakistaniImages[28],
      pantryKeywords: ["rice", "milk", "sugar", "cardamom", "nuts"],
      ingredients: [
        "1 liter full cream milk",
        "¼ cup basmati rice, soaked",
        "½ cup sugar",
        "4 cardamom pods, crushed",
        "2 tablespoons chopped almonds",
        "2 tablespoons pistachios",
        "Few saffron strands",
        "1 tablespoon rose water"
      ],
      steps: [
        "Boil milk in heavy bottom pan.",
        "Drain rice, add to boiling milk.",
        "Cook on low heat, stirring frequently.",
        "Continue until rice is soft and milk thickens (45-50 minutes).",
        "Add sugar, cardamom, and half the nuts.",
        "Cook for 10 more minutes until sugar dissolves.",
        "Add rose water and saffron.",
        "Cool to room temperature, then refrigerate.",
        "Garnish with remaining nuts before serving.",
        "Serve chilled."
      ]
    },
    { 
      id: 30, 
      name: "Gajar ka Halwa",
      tagline: "Winter special carrot pudding",
      image: pakistaniImages[29],
      pantryKeywords: ["carrot", "milk", "sugar", "ghee", "nuts"],
      ingredients: [
        "1 kg red carrots, grated",
        "1 liter full cream milk",
        "1 cup sugar",
        "½ cup ghee",
        "4 cardamom pods, crushed",
        "¼ cup chopped nuts (almonds, pistachios)",
        "2 tablespoons khoya (optional)"
      ],
      steps: [
        "In heavy pan, add grated carrots and milk.",
        "Cook on medium heat, stirring occasionally.",
        "Continue until milk almost dries up (45-50 minutes).",
        "Add ghee and cardamom, cook for 10 minutes.",
        "Add sugar and nuts, cook until halwa leaves pan.",
        "Add khoya if using, mix well.",
        "Cook for 5 more minutes until ghee separates.",
        "Garnish with more nuts.",
        "Serve warm."
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
      
      const scoredRecipes = pakistaniRecipes.map(recipe => {
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
    <div className="pakistani-page">
      {/* Header */}
      <header className="pakistani-header">
        <div className="pakistani-header-content">
          <h1 className="pakistani-page-title">Pakistani Cuisine</h1>
          <p className="pakistani-page-description">
            Rich flavors, aromatic spices & timeless traditions
          </p>
        </div>
      </header>

      {/* Pantry Suggestions - 2 Recipes */}
      {showSuggestions && (
        <div className="pakistani-pantry-suggestions">
          <div className="pakistani-suggestions-header">
            <i className="fas fa-lightbulb"></i>
            <h3>Based on your pantry, you can make:</h3>
          </div>
          <div className="pakistani-suggestions-grid two-suggestions">
            {suggestedRecipes.map(recipe => (
              <div 
                key={`suggest-${recipe.id}`} 
                className="pakistani-suggestion-card"
                onClick={() => applySuggestion(recipe)}
              >
                <div className="pakistani-suggestion-image" style={{backgroundImage: `url(${recipe.image})`}}></div>
                <div className="pakistani-suggestion-content">
                  <h4>{recipe.name}</h4>
                  <p>{recipe.tagline}</p>
                  <p className="pakistani-match-info">✓ {recipe.score} items match your pantry</p>
                  <button className="pakistani-suggestion-btn">Cook This</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipes Grid */}
      <main className="pakistani-main">
        <div className="pakistani-grid-section">
          <div className="pakistani-grid">
            {pakistaniRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="pakistani-technique-card"
                onClick={() => handleRecipeSelect(recipe)}
              >
                <div 
                  className="pakistani-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                
                <div className="pakistani-card-content">
                  <h3 className="pakistani-card-title">{recipe.name}</h3>
                  <p className="pakistani-card-description">{recipe.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {showDetailPanel && selectedRecipe && (
        <div className="pakistani-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="pakistani-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="pakistani-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="pakistani-modal-header">
              <div className="pakistani-modal-title">
                <h2>{selectedRecipe.name}</h2>
                <p>{selectedRecipe.tagline}</p>
              </div>
            </div>

            <div className="pakistani-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="pakistani-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="pakistani-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="pakistani-ingredient-item">
                      <span className="pakistani-ingredient-bullet">•</span>
                      <span className="pakistani-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="pakistani-modal-steps">
                <h3>Steps to Make</h3>
                <div className="pakistani-steps-list">
                  {selectedRecipe.steps.map((step, idx) => (
                    <div key={idx} className="pakistani-step-item">
                      <span className="pakistani-step-number">{idx + 1}.</span>
                      <span className="pakistani-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="pakistani-modal-voice-container">
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

export default PakistaniCuisine;