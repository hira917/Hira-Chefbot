import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './BudgetFriendly.css';

const BudgetFriendly = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // Pakistani recipes images array
  const recipeImages = [
    "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Matar Pulao
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Aloo Anday
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Daal Moong
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Aloo Shimla Mirch
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Chinese Rice
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Bread Roll
    "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Chicken Pakora
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Mooli Ke Kofte
    "https://images.unsplash.com/photo-1598860519260-2d5f3695e127?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Dahi Wale Baingan
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Bhuni Seviyan
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Chicken Curry
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Lauki Chana Dal
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Chicken Samosa
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Aloo Palak
    "https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"  // Bombay Sandwich
  ];

  // All Pakistani Recipes Data with Complete Recipes
  const pakistaniRecipes = [
    { 
      id: 1, 
      name: "Matar Pulao",
      tagline: "Fragrant rice with green peas and aromatic spices",
      image: recipeImages[0],
      ingredients: [
        "2 cups basmati rice",
        "1 cup fresh green peas",
        "1 large onion, thinly sliced",
        "2 tablespoons ghee or oil",
        "1 teaspoon cumin seeds",
        "4-5 whole black peppercorns",
        "2-3 green cardamoms",
        "1 inch cinnamon stick",
        "4-5 cloves",
        "Salt to taste",
        "4 cups water",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Wash and soak basmati rice in water for 30 minutes, then drain.",
        "Heat ghee or oil in a heavy-bottomed pot or pressure cooker.",
        "Add cumin seeds, black peppercorns, green cardamoms, cinnamon stick, and cloves.",
        "When spices crackle, add thinly sliced onions and sauté until golden brown.",
        "Add fresh green peas and sauté for 2-3 minutes.",
        "Add drained rice and gently mix with peas and spices.",
        "Pour in 4 cups of water and add salt to taste.",
        "Bring to a boil, then reduce heat to low, cover and cook for 15-20 minutes until rice is done.",
        "If using pressure cooker, cook for 2 whistles on medium heat.",
        "Once cooked, let it rest for 10 minutes before opening the lid.",
        "Fluff the pulao gently with a fork.",
        "Garnish with fresh coriander leaves.",
        "Serve hot with raita or any curry of your choice."
      ]
    },
    { 
      id: 2, 
      name: "Aloo Anday",
      tagline: "Hearty potato and egg curry",
      image: recipeImages[1],
      ingredients: [
        "4 large potatoes, boiled and cubed",
        "4 eggs, boiled and halved",
        "2 medium onions, finely chopped",
        "2 tomatoes, pureed",
        "2 green chilies, slit",
        "1 tablespoon ginger-garlic paste",
        "1/2 teaspoon turmeric powder",
        "1 teaspoon red chili powder",
        "1 teaspoon coriander powder",
        "1/2 teaspoon garam masala",
        "Salt to taste",
        "2 tablespoons oil",
        "Fresh coriander for garnish",
        "1/2 teaspoon cumin seeds"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add finely chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and green chilies, cook for 2 minutes.",
        "Add tomato puree and cook until oil separates from the masala.",
        "Add turmeric powder, red chili powder, coriander powder, and salt.",
        "Cook the spices for 2-3 minutes on medium heat.",
        "Add boiled potato cubes and mix well, coating them with the masala.",
        "Add 1 cup water, cover and simmer for 10 minutes.",
        "Gently add boiled egg halves to the curry.",
        "Sprinkle garam masala and cook for another 5 minutes.",
        "Adjust gravy consistency by adding more water if needed.",
        "Garnish with fresh coriander leaves.",
        "Serve hot with roti, naan, or rice."
      ]
    },
    { 
      id: 3, 
      name: "Daal Moong",
      tagline: "Simple and comforting yellow lentil curry",
      image: recipeImages[2],
      ingredients: [
        "1 cup yellow moong dal (split green gram)",
        "1 large onion, finely chopped",
        "2 tomatoes, finely chopped",
        "2 green chilies, slit",
        "1 tablespoon ginger, finely chopped",
        "1 tablespoon garlic, finely chopped",
        "1/2 teaspoon turmeric powder",
        "1 teaspoon red chili powder",
        "1 teaspoon coriander powder",
        "1/2 teaspoon garam masala",
        "1 teaspoon cumin seeds",
        "2 tablespoons ghee",
        "Salt to taste",
        "Fresh coriander for garnish",
        "1 tablespoon lemon juice"
      ],
      steps: [
        "Wash moong dal thoroughly and soak in water for 30 minutes.",
        "Pressure cook dal with 3 cups water, turmeric powder, and salt for 3-4 whistles.",
        "Mash the cooked dal lightly with a spoon.",
        "Heat ghee in a separate pan, add cumin seeds and let them splutter.",
        "Add chopped ginger, garlic, and green chilies, sauté for 1 minute.",
        "Add finely chopped onions and cook until golden brown.",
        "Add chopped tomatoes and cook until soft and mushy.",
        "Add red chili powder and coriander powder, cook for 2 minutes.",
        "Pour the cooked dal into the masala and mix well.",
        "Add water to adjust consistency, simmer for 10-15 minutes.",
        "Add garam masala and lemon juice, mix well.",
        "Cook for another 2-3 minutes on low heat.",
        "Garnish with fresh coriander leaves.",
        "Serve hot with rice or roti."
      ]
    },
    { 
      id: 4, 
      name: "Aloo Shimla Mirch",
      tagline: "Potato and bell pepper curry",
      image: recipeImages[3],
      ingredients: [
        "3 medium potatoes, cubed",
        "2 capsicums (bell peppers), cubed",
        "1 large onion, sliced",
        "2 tomatoes, chopped",
        "2 green chilies, slit",
        "1 teaspoon cumin seeds",
        "1/2 teaspoon turmeric powder",
        "1 teaspoon red chili powder",
        "1 teaspoon coriander powder",
        "1/2 teaspoon garam masala",
        "Salt to taste",
        "2 tablespoons oil",
        "Fresh coriander for garnish",
        "1 teaspoon ginger-garlic paste"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add sliced onions and sauté until translucent.",
        "Add ginger-garlic paste and green chilies, cook for 1 minute.",
        "Add chopped tomatoes and cook until soft.",
        "Add turmeric powder, red chili powder, coriander powder, and salt.",
        "Mix well and cook the spices for 2 minutes.",
        "Add cubed potatoes and mix to coat with masala.",
        "Add 1/4 cup water, cover and cook until potatoes are half done.",
        "Add cubed capsicums and mix gently.",
        "Cover and cook on low heat until vegetables are tender.",
        "Add garam masala and mix well.",
        "Cook uncovered for 2-3 minutes to evaporate excess moisture.",
        "Garnish with fresh coriander leaves.",
        "Serve hot with roti or paratha."
      ]
    },
    { 
      id: 5, 
      name: "Chicken Egg Fried Rice",
      tagline: "Quick and flavorful fried rice with chicken and eggs",
      image: recipeImages[4],
      ingredients: [
        "2 cups basmati rice, cooked and cooled",
        "200g chicken breast, cubed",
        "2 eggs, beaten",
        "1 cup mixed vegetables (carrots, peas, corn)",
        "1 onion, finely chopped",
        "4-5 garlic cloves, minced",
        "2 tablespoons soy sauce",
        "1 tablespoon vinegar",
        "1 teaspoon black pepper powder",
        "Salt to taste",
        "3 tablespoons oil",
        "2 green onions, chopped",
        "1 teaspoon sugar"
      ],
      steps: [
        "Heat 1 tablespoon oil in a wok or large pan.",
        "Add beaten eggs and scramble them, then remove and set aside.",
        "In the same wok, add 1 tablespoon oil and sauté chicken cubes until cooked, set aside.",
        "Add remaining oil, sauté minced garlic until fragrant.",
        "Add chopped onion and cook until translucent.",
        "Add mixed vegetables and stir-fry for 3-4 minutes.",
        "Add cooked rice and mix gently with vegetables.",
        "Add soy sauce, vinegar, black pepper powder, salt, and sugar.",
        "Mix everything well on high heat for 2-3 minutes.",
        "Add cooked chicken and scrambled eggs, mix gently.",
        "Stir-fry for another 2 minutes until everything is well combined.",
        "Add chopped green onions and mix.",
        "Taste and adjust seasoning if needed.",
        "Serve hot with chili sauce or tomato ketchup."
      ]
    },
    { 
      id: 6, 
      name: "Bread Roll",
      tagline: "Crispy bread rolls with spiced potato filling",
      image: recipeImages[5],
      ingredients: [
        "6 bread slices",
        "3 medium potatoes, boiled and mashed",
        "1 onion, finely chopped",
        "1 green chili, finely chopped",
        "1/2 teaspoon cumin seeds",
        "1/2 teaspoon garam masala",
        "1/2 teaspoon chaat masala",
        "1/2 teaspoon amchur powder",
        "Salt to taste",
        "Fresh coriander, chopped",
        "Oil for deep frying",
        "Water for sealing",
        "1 tablespoon cornflour (optional)"
      ],
      steps: [
        "Heat 1 tablespoon oil, add cumin seeds and let them splutter.",
        "Add chopped onion and green chili, sauté until onions are soft.",
        "Add mashed potatoes and all spices (garam masala, chaat masala, amchur powder, salt).",
        "Mix well and cook for 2-3 minutes, then add fresh coriander.",
        "Remove from heat and let the filling cool completely.",
        "Trim bread crusts and flatten bread slices with a rolling pin.",
        "Place 2 tablespoons of potato filling on each bread slice.",
        "Roll the bread tightly, sealing edges with water or cornflour paste.",
        "Press gently to seal properly.",
        "Heat oil for deep frying on medium heat.",
        "Fry bread rolls until golden brown and crispy.",
        "Drain on paper towels to remove excess oil.",
        "Serve hot with green chutney or tomato ketchup.",
        "For healthier option, you can shallow fry or bake them."
      ]
    },
    { 
      id: 7, 
      name: "Chicken Pakora",
      tagline: "Crispy fried chicken fritters",
      image: recipeImages[6],
      ingredients: [
        "500g chicken, cut into bite-sized pieces",
        "1 cup besan (gram flour)",
        "2 tablespoons rice flour",
        "1 tablespoon achari masala",
        "1 teaspoon red chili powder",
        "1/2 teaspoon turmeric powder",
        "1 teaspoon coriander powder",
        "1 tablespoon lemon juice",
        "2 tablespoons yogurt",
        "Salt to taste",
        "Oil for deep frying",
        "1 teaspoon carom seeds (ajwain)",
        "1 tablespoon ginger-garlic paste"
      ],
      steps: [
        "Clean and wash chicken pieces, pat dry with paper towel.",
        "In a bowl, mix ginger-garlic paste, lemon juice, yogurt, and all spices except besan.",
        "Add chicken pieces to this marinade, mix well, and let marinate for 1 hour.",
        "After marination, add besan and rice flour to the chicken.",
        "Mix well to coat all chicken pieces evenly with batter.",
        "If batter is too thick, add 1-2 tablespoons water to get coating consistency.",
        "Heat oil for deep frying on medium heat.",
        "Carefully drop chicken pieces one by one into hot oil.",
        "Fry on medium heat until golden brown and crispy.",
        "Do not overcrowd the pan, fry in batches.",
        "Remove pakoras with slotted spoon and drain on paper towels.",
        "Sprinkle some chaat masala or extra achari masala if desired.",
        "Serve hot with mint chutney or tamarind sauce.",
        "Best enjoyed immediately while crispy."
      ]
    },
    { 
      id: 8, 
      name: "Mooli Ke Kofte",
      tagline: "Radish dumplings in rich gravy",
      image: recipeImages[7],
      ingredients: [
        "2 cups radish (mooli), grated",
        "1/2 cup besan (gram flour)",
        "2 onions, finely chopped",
        "2 tomatoes, pureed",
        "1 tablespoon ginger-garlic paste",
        "1 teaspoon cumin seeds",
        "1/2 teaspoon turmeric powder",
        "1 teaspoon red chili powder",
        "1 teaspoon coriander powder",
        "1/2 teaspoon garam masala",
        "Salt to taste",
        "Oil for frying",
        "Fresh coriander for garnish",
        "1 green chili, chopped"
      ],
      steps: [
        "Squeeze excess water from grated radish.",
        "Mix radish with besan, salt, and 1/2 teaspoon red chili powder.",
        "Make small balls (koftas) from the mixture.",
        "Heat oil in a pan and deep fry koftas until golden brown, set aside.",
        "For gravy: Heat 2 tablespoons oil, add cumin seeds.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and green chili, cook for 1 minute.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder, coriander powder, and salt.",
        "Cook for 2-3 minutes, then add 2 cups water.",
        "Simmer gravy for 10 minutes until slightly thick.",
        "Gently add fried koftas to the hot gravy.",
        "Cook for 5 minutes on low heat, do not stir too much.",
        "Add garam masala and garnish with fresh coriander.",
        "Serve hot with roti or naan."
      ]
    },
    { 
      id: 9, 
      name: "Bharta",
      tagline: "Smoky roasted eggplant curry",
      image: recipeImages[8],
      ingredients: [
        "4 small eggplants",
        "1 cup thick yogurt",
        "2 onions, finely chopped",
        "2 tomatoes, finely chopped",
        "1 tablespoon ginger-garlic paste",
        "1 teaspoon cumin seeds",
        "1/2 teaspoon turmeric powder",
        "1 teaspoon red chili powder",
        "1 teaspoon coriander powder",
        "1/2 teaspoon garam masala",
        "Salt to taste",
        "2 tablespoons oil",
        "Fresh coriander for garnish",
        "1 teaspoon mustard seeds",
        "1/4 teaspoon asafoetida (hing)"
      ],
      steps: [
        "Wash eggplants and make 4 slits in each without cutting through.",
        "Soak in salted water for 10 minutes, then drain and pat dry.",
        "Heat oil in a pan, shallow fry eggplants until soft, set aside.",
        "In the same oil, add cumin seeds and mustard seeds.",
        "When they crackle, add asafoetida and chopped onions.",
        "Sauté onions until golden brown, then add ginger-garlic paste.",
        "Add chopped tomatoes and cook until soft.",
        "Add all dry spices except garam masala, cook for 2 minutes.",
        "Whisk yogurt until smooth, then add to the masala.",
        "Cook on low heat, stirring continuously until gravy thickens.",
        "Add fried eggplants gently into the gravy.",
        "Cover and simmer for 5-7 minutes on low heat.",
        "Add garam masala and mix gently.",
        "Garnish with fresh coriander leaves.",
        "Serve hot with steamed rice or roti."
      ]
    },
    { 
      id: 10, 
      name: "Bhuni Seviyan",
      tagline: "Sweet roasted vermicelli dessert",
      image: recipeImages[9],
      ingredients: [
        "2 cups vermicelli",
        "1/2 cup ghee or oil",
        "1 cup sugar",
        "3 cups milk",
        "1/2 cup condensed milk",
        "1/2 teaspoon cardamom powder",
        "1/4 cup mixed nuts (almonds, cashews, pistachios)",
        "2 tablespoons raisins",
        "Saffron strands (optional)",
        "1 tablespoon rose water (optional)"
      ],
      steps: [
        "Heat ghee in a heavy-bottomed pan on medium heat.",
        "Add vermicelli and roast until golden brown, stirring continuously.",
        "Be careful not to burn, roast on low-medium heat.",
        "Once vermicelli is roasted, add milk and bring to boil.",
        "Reduce heat and simmer until vermicelli is cooked and milk is absorbed.",
        "Add sugar and condensed milk, mix well.",
        "Cook for 5-7 minutes until sugar dissolves completely.",
        "In a separate small pan, fry nuts and raisins in 1 teaspoon ghee.",
        "Add fried nuts, raisins, and cardamom powder to vermicelli.",
        "If using saffron, soak in 2 tablespoons warm milk and add.",
        "Add rose water if using, mix gently.",
        "Cook for another 2-3 minutes on low heat.",
        "Remove from heat and let it cool slightly.",
        "Serve warm or at room temperature.",
        "Can be garnished with more nuts before serving."
      ]
    },
    { 
      id: 11, 
      name: "Chicken Curry Dhaba Style",
      tagline: "Rich and spicy roadside-style chicken curry",
      image: recipeImages[10],
      ingredients: [
        "1 kg chicken, cut into pieces",
        "3 large onions, finely chopped",
        "3 tomatoes, pureed",
        "2 tablespoons ginger-garlic paste",
        "4-5 green chilies, slit",
        "2 tablespoons coriander powder",
        "1 tablespoon red chili powder",
        "1/2 teaspoon turmeric powder",
        "1 tablespoon garam masala",
        "1/2 cup oil or ghee",
        "Salt to taste",
        "Fresh coriander for garnish",
        "1 tablespoon kasuri methi (dried fenugreek leaves)",
        "1/4 cup cream (optional)"
      ],
      steps: [
        "Heat oil/ghee in a large kadai or pot.",
        "Add chopped onions and sauté until dark brown (not burnt).",
        "Add ginger-garlic paste and green chilies, cook for 2 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add all dry spices except garam masala, cook for 3-4 minutes.",
        "Add chicken pieces and mix well to coat with masala.",
        "Cook on high heat for 5 minutes until chicken changes color.",
        "Add 2 cups water, cover and cook until chicken is tender.",
        "Once chicken is cooked, cook uncovered to thicken gravy.",
        "Add garam masala and crushed kasuri methi.",
        "Add cream if using, mix gently.",
        "Cook for another 5 minutes on low heat.",
        "Garnish with fresh coriander leaves.",
        "Serve hot with naan, roti, or rice.",
        "Dhaba style curry should have thick, rich gravy."
      ]
    },
    { 
      id: 12, 
      name: "Lauki Chana Dal",
      tagline: "Bottle gourd and chickpea lentil curry",
      image: recipeImages[11],
      ingredients: [
        "1 cup chana dal (split chickpeas)",
        "2 cups bottle gourd (lauki), peeled and cubed",
        "1 onion, finely chopped",
        "2 tomatoes, finely chopped",
        "1 teaspoon cumin seeds",
        "1/2 teaspoon turmeric powder",
        "1 teaspoon red chili powder",
        "1 teaspoon coriander powder",
        "Salt to taste",
        "2 tablespoons oil",
        "Fresh coriander for garnish",
        "1 teaspoon ginger-garlic paste",
        "1/2 teaspoon garam masala"
      ],
      steps: [
        "Wash chana dal and soak in water for 30 minutes.",
        "Pressure cook dal with 3 cups water, turmeric powder, and salt for 3-4 whistles.",
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and cook for 1 minute.",
        "Add chopped tomatoes and cook until soft.",
        "Add red chili powder and coriander powder, cook for 2 minutes.",
        "Add cubed bottle gourd and sauté for 3-4 minutes.",
        "Add cooked chana dal along with its water.",
        "Mix well and simmer for 10-15 minutes until lauki is cooked.",
        "Mash some dal and lauki with the back of spoon to thicken gravy.",
        "Add garam masala and mix well.",
        "Adjust consistency by adding water if needed.",
        "Garnish with fresh coriander leaves.",
        "Serve hot with rice or roti."
      ]
    },
    { 
      id: 13, 
      name: "Chicken Samosa",
      tagline: "Crispy fried pastry with spiced chicken filling",
      image: recipeImages[12],
      ingredients: [
        "For dough: 2 cups all-purpose flour",
        "1/4 cup oil or ghee",
        "Salt to taste",
        "Water as needed",
        "For filling: 250g chicken mince",
        "1 onion, finely chopped",
        "1 teaspoon ginger-garlic paste",
        "2 green chilies, finely chopped",
        "1/2 teaspoon turmeric powder",
        "1 teaspoon red chili powder",
        "1 teaspoon garam masala",
        "Salt to taste",
        "2 tablespoons oil",
        "Fresh coriander, chopped",
        "Oil for deep frying"
      ],
      steps: [
        "For dough: Mix flour, salt, and oil until crumbly.",
        "Add water gradually to make stiff dough, knead for 5 minutes.",
        "Cover dough and let rest for 30 minutes.",
        "For filling: Heat oil, sauté onions until golden.",
        "Add ginger-garlic paste and green chilies, cook for 1 minute.",
        "Add chicken mince and cook until it changes color.",
        "Add all spices and cook until chicken is fully cooked.",
        "Add fresh coriander, mix and let filling cool completely.",
        "Divide dough into small balls, roll into thin circles.",
        "Cut each circle into two semi-circles.",
        "Take one semi-circle, fold into cone shape, seal edges with water.",
        "Fill cone with chicken filling, seal top edge properly.",
        "Make sure samosas are properly sealed to prevent leaking.",
        "Heat oil for deep frying on medium heat.",
        "Fry samosas until golden brown and crispy.",
        "Drain on paper towels and serve hot with chutney."
      ]
    },
    { 
      id: 14, 
      name: "Aloo Palak",
      tagline: "Potato and spinach curry",
      image: recipeImages[13],
      ingredients: [
        "3 medium potatoes, cubed",
        "1 bunch spinach (palak), washed and chopped",
        "1 onion, finely chopped",
        "2 tomatoes, finely chopped",
        "1 teaspoon cumin seeds",
        "1/2 teaspoon turmeric powder",
        "1 teaspoon red chili powder",
        "1 teaspoon coriander powder",
        "1/2 teaspoon garam masala",
        "Salt to taste",
        "2 tablespoons oil or ghee",
        "1 tablespoon ginger-garlic paste",
        "2 green chilies, slit",
        "1/4 cup cream (optional)"
      ],
      steps: [
        "Boil potatoes until just tender, drain and set aside.",
        "Blanch spinach in boiling water for 2 minutes, then drain.",
        "Blend blanched spinach into smooth puree.",
        "Heat oil/ghee in a pan, add cumin seeds.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and green chilies, cook for 1 minute.",
        "Add chopped tomatoes and cook until soft.",
        "Add all dry spices except garam masala, cook for 2 minutes.",
        "Add boiled potato cubes and mix gently.",
        "Add spinach puree and mix well.",
        "Add 1/2 cup water and simmer for 10 minutes.",
        "Add garam masala and cream if using, mix well.",
        "Cook for another 2-3 minutes on low heat.",
        "Adjust consistency by adding water if needed.",
        "Serve hot with roti, naan, or rice."
      ]
    },
    { 
      id: 15, 
      name: "Bombay Sandwich",
      tagline: "Mumbai street-style grilled sandwich",
      image: recipeImages[14],
      ingredients: [
        "8 bread slices",
        "2 large potatoes, boiled and sliced",
        "1 cucumber, thinly sliced",
        "1 tomato, thinly sliced",
        "1 onion, thinly sliced",
        "Butter as needed",
        "For green chutney: 1 cup coriander leaves",
        "1/2 cup mint leaves",
        "2 green chilies",
        "1 tablespoon lemon juice",
        "Salt to taste",
        "For sandwich masala: 1 teaspoon chaat masala",
        "1/2 teaspoon black salt",
        "1/2 teaspoon red chili powder",
        "Cheese slices (optional)",
        "Tomato ketchup"
      ],
      steps: [
        "For green chutney: Blend coriander, mint, green chilies, lemon juice, and salt.",
        "Mix all sandwich masala ingredients in a small bowl.",
        "Butter all bread slices on one side.",
        "Spread green chutney on 4 bread slices (buttered side).",
        "Layer potato slices on chutney, sprinkle sandwich masala.",
        "Add cucumber, tomato, and onion slices.",
        "Add cheese slice if using, and tomato ketchup.",
        "Cover with another bread slice (buttered side out).",
        "Heat a sandwich grill or tawa, brush with butter.",
        "Place sandwich and grill until golden brown on both sides.",
        "If using tawa, press with spatula while cooking.",
        "Cut diagonally into triangles.",
        "Serve hot with more green chutney and ketchup.",
        "For street-style, wrap in paper or foil.",
        "Best enjoyed immediately while crispy."
      ]
    }
  ];

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
        utterance.text = `Step ${stepIndex + 1}: ${steps[stepIndex]}`;
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        setCurrentStep(stepIndex + 1);
        const stepProgress = ((stepIndex + 1) / steps.length) * 100;
        setProgress(stepProgress);
        
        utterance.onstart = () => {
          setIsPlaying(true);
        };
        
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

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="budget-page">
      {/* Header */}
      <header className="budget-header">
        <div className="budget-header-content">
          <h1 className="budget-page-title">Flavors of Home</h1>
          <p className="budget-page-description">
            Authentic tastes, simplified recipes, and ingredients close to home.
          </p>
        </div>
      </header>

      {/* Budget Grid */}
      <main className="budget-main">
        <div className="budget-grid-section">
          <div className="budget-grid">
            {pakistaniRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="budget-technique-card"
                onClick={() => handleRecipeSelect(recipe)}
              >
                <div 
                  className="budget-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                
                <div className="budget-card-content">
                  <h3 className="budget-card-title">{recipe.name}</h3>
                  <p className="budget-card-description">{recipe.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Back to Home Button */}
      <div className="back-button-container">
        <button className="back-home-btn" onClick={handleGoBack}>
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>
      </div>

      {/* DETAIL MODAL with SELECTED RECIPE IMAGE as Background */}
      {showDetailPanel && selectedRecipe && (
        <div className="budget-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="budget-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="budget-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="budget-modal-header">
              <div className="budget-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="budget-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="budget-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="budget-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="budget-ingredient-item">
                      <span className="budget-ingredient-bullet">•</span>
                      <span className="budget-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="budget-modal-steps">
                <h3>Steps to Make</h3>
                <div className="budget-steps-list">
                  {selectedRecipe.steps.map((step, idx) => (
                    <div key={idx} className="budget-step-item">
                      <span className="budget-step-number">{idx + 1}.</span>
                      <span className="budget-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="budget-modal-voice-container">
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
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRecipe.steps)}
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
                        <i className="fas fa-backward"></i> Prev
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

export default BudgetFriendly;