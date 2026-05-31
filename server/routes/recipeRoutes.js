const express = require('express');
const router = express.Router();
const {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  searchRecipes,
  getRecipesByPantry,
  getRecipesByCategory,
  getRecipesBySubCategory,
  getFeaturedRecipes,
  getRecipesByCuisine,
  getRecipeCount,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// ============================================================
// PUBLIC ROUTES (No Token Required) - Sab GET requests public
// ============================================================

// GET /api/recipes/count?category=Breakfast
router.get('/count', getRecipeCount);

// GET /api/recipes/search?q=biryani
router.get('/search', searchRecipes);

// GET /api/recipes/pantry?keywords=egg,milk,flour
router.get('/pantry', getRecipesByPantry);

// GET /api/recipes/featured
router.get('/featured', getFeaturedRecipes);

// GET /api/recipes/category/:category
router.get('/category/:category', getRecipesByCategory);

// GET /api/recipes/subcategory/:subCategory
router.get('/subcategory/:subCategory', getRecipesBySubCategory);

// GET /api/recipes/cuisine/:cuisine
router.get('/cuisine/:cuisine', getRecipesByCuisine);

// GET /api/recipes (all recipes with filters)
router.get('/', getAllRecipes);

// GET /api/recipes/:id (single recipe)
router.get('/:id', getRecipeById);

// ============================================================
// PRIVATE ROUTES (Token Required) - Sirf POST, PUT, DELETE
// ============================================================

// POST /api/recipes - Add new recipe (Admin only)
router.post('/', protect, adminOnly, addRecipe);

// PUT /api/recipes/:id - Update recipe (Admin only)
router.put('/:id', protect, adminOnly, updateRecipe);

// DELETE /api/recipes/:id - Delete recipe (Admin only)
router.delete('/:id', protect, adminOnly, deleteRecipe);

module.exports = router;