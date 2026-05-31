import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

// ========== BACKEND API CONFIGURATION ==========
const API_URL = 'http://localhost:5000/api';

// ========== MAIN DASHBOARD COMPONENT ==========
const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showPassword, setShowPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Dark/Light Mode
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [currentTime, setCurrentTime] = useState(new Date());

  // ========== STATE FOR ALL FEATURES ==========
  const [users, setUsers] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [pantryItems, setPantryItems] = useState([]);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipeCollection, setRecipeCollection] = useState([]);
  const [mealSuggestions, setMealSuggestions] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [cookingGuidance, setCookingGuidance] = useState([]);
  const [cookingAlarms, setCookingAlarms] = useState([]);
  const [dailyReports, setDailyReports] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [selectedUserForActivity, setSelectedUserForActivity] = useState(null);

  // ========== CHARTS DATA ==========
  const [weeklyActivity, setWeeklyActivity] = useState([
    { day: 'Mon', count: 65 },
    { day: 'Tue', count: 78 },
    { day: 'Wed', count: 82 },
    { day: 'Thu', count: 71 },
    { day: 'Fri', count: 89 },
    { day: 'Sat', count: 94 },
    { day: 'Sun', count: 86 }
  ]);
  const [popularRecipes, setPopularRecipes] = useState([
    { name: 'Butter Chicken', views: 234 },
    { name: 'Chicken Biryani', views: 198 },
    { name: 'Mutton Karahi', views: 167 },
    { name: 'Chicken Pasta', views: 145 },
    { name: 'Malai Boti', views: 123 },
    { name: 'Chicken Corn Soup', views: 98 }
  ]);

  // ========== SYSTEM SETTINGS ==========
  const [bilingualSupport, setBilingualSupport] = useState(false);
  const [settings, setSettings] = useState({
    appName: 'ChefBot',
    emailNotifications: true,
    pushNotifications: true,
    autoBackup: false,
    dateFormat: 'DD/MM/YYYY',
    currency: 'USD',
    language: 'English'
  });

  // ========== SYSTEM STATS ==========
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    totalMealPlans: 0,
    totalReports: 0,
    activeUsers: 0,
    pendingRequests: 0,
    totalPantryItems: 0,
    totalShoppingItems: 0,
    totalSuggestions: 0,
    totalActivities: 0,
    totalGuidance: 0,
    totalAlarms: 0
  });

  // ========== CATEGORIES FOR SHOPPING ITEMS ==========
  const shoppingCategories = ['All', 'Dairy', 'Vegetables', 'Fruits', 'Meat', 'Seafood', 'Grains', 'Spices', 'Beverages', 'Snacks', 'Frozen', 'Other'];

  // ========== AXIOS CONFIG ==========
  const axiosConfig = {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  };

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // ========== CHECK IF USER IS ALREADY LOGGED IN ==========
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  // ========== FETCH ALL FUNCTIONS ==========
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`, axiosConfig);
      setUsers(response.data.users || response.data);
      setSystemStats(prev => ({ ...prev, totalUsers: response.data.users?.length || response.data.length }));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserActivities = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/user-activities`, axiosConfig);
      setUserActivities(response.data);
      setSystemStats(prev => ({ ...prev, totalActivities: response.data.length }));
    } catch (error) {
      console.error('Error fetching user activities:', error);
    }
  };

  const fetchPantryItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/pantry-items`, axiosConfig);
      setPantryItems(response.data);
      setSystemStats(prev => ({ ...prev, totalPantryItems: response.data.length }));
    } catch (error) {
      console.error('Error fetching pantry items:', error);
    }
  };

  const fetchShoppingItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/shopping-items`, axiosConfig);
      setShoppingItems(response.data);
      setSystemStats(prev => ({ ...prev, totalShoppingItems: response.data.length }));
    } catch (error) {
      console.error('Error fetching shopping items:', error);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${API_URL}/recipes`, axiosConfig);
      setRecipes(response.data);
      setSystemStats(prev => ({ ...prev, totalRecipes: response.data.length }));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchRecipeCollection = async () => {
    try {
      const response = await axios.get(`${API_URL}/recipe-collection`, axiosConfig);
      setRecipeCollection(response.data);
    } catch (error) {
      console.error('Error fetching recipe collection:', error);
    }
  };

  const fetchMealSuggestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/meal-suggestions`, axiosConfig);
      setMealSuggestions(response.data);
      setSystemStats(prev => ({ ...prev, totalSuggestions: response.data.length }));
    } catch (error) {
      console.error('Error fetching meal suggestions:', error);
    }
  };

  const fetchMealPlans = async () => {
    try {
      const response = await axios.get(`${API_URL}/meal-plans`, axiosConfig);
      setMealPlans(response.data);
      setSystemStats(prev => ({ ...prev, totalMealPlans: response.data.length }));
    } catch (error) {
      console.error('Error fetching meal plans:', error);
    }
  };

  const fetchCookingGuidance = async () => {
    try {
      const response = await axios.get(`${API_URL}/cooking-guidance`, axiosConfig);
      setCookingGuidance(response.data);
      setSystemStats(prev => ({ ...prev, totalGuidance: response.data.length }));
    } catch (error) {
      console.error('Error fetching cooking guidance:', error);
    }
  };

  const fetchCookingAlarms = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/all-alarms`, axiosConfig);
      setCookingAlarms(response.data.alarms || response.data);
      setSystemStats(prev => ({ ...prev, totalAlarms: response.data.alarms?.length || response.data.length || 0 }));
    } catch (error) {
      console.error('Error fetching cooking alarms:', error);
      setCookingAlarms([]);
    }
  };

  const fetchDailyReports = async () => {
    try {
      const response = await axios.get(`${API_URL}/daily-reports`, axiosConfig);
      setDailyReports(response.data);
      setSystemStats(prev => ({ ...prev, totalReports: response.data.length }));
    } catch (error) {
      console.error('Error fetching daily reports:', error);
    }
  };

  const fetchAllData = async () => {
    if (!token) return;
    await fetchUsers();
    await fetchUserActivities();
    await fetchPantryItems();
    await fetchShoppingItems();
    await fetchRecipes();
    await fetchRecipeCollection();
    await fetchMealSuggestions();
    await fetchMealPlans();
    await fetchCookingGuidance();
    await fetchCookingAlarms();
    await fetchDailyReports();
  };

  // ========== REGISTER FUNCTION ==========
  const handleRegisterInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegisterError('');
    setRegisterSuccess('');

    if (!registerData.name || !registerData.email || !registerData.password) {
      setRegisterError("Please fill in all fields!");
      setLoading(false);
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!registerData.agreeToTerms) {
      setRegisterError("Please agree to the terms and conditions!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        agreeToTerms: registerData.agreeToTerms
      });

      if (response.data.success || response.data.token) {
        setRegisterSuccess('Registration successful! You can now login.');
        setRegisterData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false
        });
        setTimeout(() => {
          setShowRegister(false);
          setRegisterSuccess('');
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError(error.response?.data?.message || 'Registration failed! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ========== LOGIN FUNCTION ==========
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    if (!formData.email || !formData.password) {
      setLoginError("Please enter both email and password!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: formData.email,
        password: formData.password
      });

      if (response.data.token) {
        const userToken = response.data.token;
        localStorage.setItem('token', userToken);
        setToken(userToken);
        setIsLoggedIn(true);
        
        if (formData.remember) {
          localStorage.setItem('rememberedEmail', formData.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        setLoginError('');
      } else {
        setLoginError('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.response?.data?.message || 'Login failed! Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
    setFormData({ email: '', password: '', remember: false });
    setActiveSection('dashboard');
  };

  // ========== FORGET AND RESET PASSWORD ==========
  const handleForgetPassword = async () => {
    const email = prompt('Enter your email address to reset password:');
    if (email) {
      try {
        await axios.post(`${API_URL}/auth/forget-password`, { email });
        alert('Password reset link sent to your email!');
      } catch (error) {
        alert('Error sending reset link. Please try again.');
      }
    }
  };

  const handleResetPassword = async () => {
    const email = prompt('Enter your email address:');
    const resetToken = prompt('Enter reset token from email:');
    const newPassword = prompt('Enter new password:');
    
    if (email && resetToken && newPassword) {
      try {
        await axios.post(`${API_URL}/auth/reset-password`, { email, token: resetToken, newPassword });
        alert('Password reset successfully!');
      } catch (error) {
        alert('Error resetting password. Please try again.');
      }
    }
  };

  // ========== USER ACCOUNT MANAGEMENT ==========
  const handleManageUserAccount = (user) => {
    setSelectedUserDetails(user);
  };

  const handleUpdateUser = async () => {
    if (!selectedUserDetails) return;
    
    const newName = prompt('Enter new name:', selectedUserDetails.name);
    const newEmail = prompt('Enter new email:', selectedUserDetails.email);
    
    if (newName || newEmail) {
      try {
        await axios.put(`${API_URL}/admin/users/${selectedUserDetails._id}`, {
          name: newName || selectedUserDetails.name,
          email: newEmail || selectedUserDetails.email
        }, axiosConfig);
        alert('User updated successfully!');
        fetchUsers();
        setSelectedUserDetails(null);
      } catch (error) {
        alert('Error updating user');
      }
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      try {
        await axios.delete(`${API_URL}/admin/users/${userId}`, axiosConfig);
        alert(`User ${userName} deleted successfully`);
        fetchUsers();
      } catch (error) {
        alert('Error deleting user');
      }
    }
  };

  const handleBlockUser = async (userId, userName, currentBlocked) => {
    const action = currentBlocked ? 'unblock' : 'block';
    if (window.confirm(`Are you sure you want to ${action} ${userName}?`)) {
      try {
        await axios.put(`${API_URL}/admin/users/${userId}/${action}`, {}, axiosConfig);
        alert(`User ${userName} ${action}ed successfully`);
        fetchUsers();
      } catch (error) {
        alert('Error updating user status');
      }
    }
  };

  const handleViewUserActivityDetails = (user) => {
    setSelectedUserForActivity(user);
  };

  // ========== PANTRY ITEMS MANAGEMENT ==========
  const handleAddPantryItem = async () => {
    const name = prompt('Enter pantry item name:');
    const quantity = prompt('Enter quantity:');
    const category = prompt('Enter category (Grains, Spices, Canned, etc.):');
    if (name && quantity) {
      try {
        await axios.post(`${API_URL}/pantry-items`, { name, quantity, category }, axiosConfig);
        alert('Pantry item added successfully!');
        fetchPantryItems();
      } catch (error) {
        alert('Error adding pantry item');
      }
    }
  };

  const handleDeletePantryItem = async (itemId, itemName) => {
    if (window.confirm(`Delete pantry item "${itemName}"?`)) {
      try {
        await axios.delete(`${API_URL}/pantry-items/${itemId}`, axiosConfig);
        alert('Pantry item deleted');
        fetchPantryItems();
      } catch (error) {
        alert('Error deleting pantry item');
      }
    }
  };

  // ========== SHOPPING ITEMS MASTER MANAGEMENT ==========
  const handleAddShoppingItem = async () => {
    const name = prompt('Enter shopping item name:');
    const quantity = prompt('Enter default quantity:');
    const category = prompt('Enter category:');
    if (name && quantity) {
      try {
        await axios.post(`${API_URL}/shopping-items`, { name, quantity, category }, axiosConfig);
        alert('Shopping item added to master list!');
        fetchShoppingItems();
      } catch (error) {
        alert('Error adding shopping item');
      }
    }
  };

  const handleDeleteShoppingItem = async (itemId, itemName) => {
    if (window.confirm(`Delete shopping item "${itemName}"?`)) {
      try {
        await axios.delete(`${API_URL}/shopping-items/${itemId}`, axiosConfig);
        alert('Shopping item removed');
        fetchShoppingItems();
      } catch (error) {
        alert('Error deleting shopping item');
      }
    }
  };

  const handleEditShoppingItem = async (item) => {
    const newName = prompt('Edit item name:', item.name);
    const newQuantity = prompt('Edit quantity:', item.quantity);
    const newCategory = prompt('Edit category:', item.category);
    if (newName) {
      try {
        await axios.put(`${API_URL}/shopping-items/${item._id}`, {
          name: newName,
          quantity: newQuantity || item.quantity,
          category: newCategory || item.category
        }, axiosConfig);
        alert('Shopping item updated!');
        fetchShoppingItems();
      } catch (error) {
        alert('Error updating shopping item');
      }
    }
  };

  // ========== MEAL SUGGESTIONS MANAGEMENT ==========
  const handleGenerateMealSuggestions = async () => {
    try {
      const response = await axios.post(`${API_URL}/meal-suggestions/generate`, {}, axiosConfig);
      setMealSuggestions(response.data);
      alert('New meal suggestions generated!');
    } catch (error) {
      alert('Error generating meal suggestions');
    }
  };

  const handleDeleteSuggestion = async (suggestionId, mealName) => {
    if (window.confirm(`Delete suggestion "${mealName}"?`)) {
      try {
        await axios.delete(`${API_URL}/meal-suggestions/${suggestionId}`, axiosConfig);
        alert('Suggestion removed');
        fetchMealSuggestions();
      } catch (error) {
        alert('Error deleting suggestion');
      }
    }
  };

  // ========== RECIPE COLLECTION MANAGEMENT ==========
  const handleAddToCollection = async () => {
    const recipeName = prompt('Enter recipe name:');
    const category = prompt('Enter category:');
    const prepTime = prompt('Enter preparation time (minutes):');
    if (recipeName) {
      try {
        await axios.post(`${API_URL}/recipe-collection`, { 
          recipeName, 
          category, 
          prepTime: prepTime || 30,
          status: 'Published'
        }, axiosConfig);
        alert('Recipe added to collection!');
        fetchRecipeCollection();
      } catch (error) {
        alert('Error adding to collection');
      }
    }
  };

  const handleDeleteFromCollection = async (collectionId, recipeName) => {
    if (window.confirm(`Remove "${recipeName}" from collection?`)) {
      try {
        await axios.delete(`${API_URL}/recipe-collection/${collectionId}`, axiosConfig);
        alert('Recipe removed');
        fetchRecipeCollection();
      } catch (error) {
        alert('Error removing recipe');
      }
    }
  };

  const handleEditRecipe = async (recipe) => {
    const newName = prompt('Edit recipe name:', recipe.recipeName);
    const newCategory = prompt('Edit category:', recipe.category);
    if (newName) {
      try {
        await axios.put(`${API_URL}/recipe-collection/${recipe._id}`, {
          recipeName: newName,
          category: newCategory || recipe.category
        }, axiosConfig);
        alert('Recipe updated!');
        fetchRecipeCollection();
      } catch (error) {
        alert('Error updating recipe');
      }
    }
  };

  // ========== MEAL PLANNING MANAGEMENT ==========
  const handleAddMealPlan = async () => {
    const userName = prompt('Enter user name:');
    const planType = prompt('Enter plan type (Daily/Weekly):');
    const meals = prompt('Enter meals (comma separated):');
    if (userName && meals) {
      try {
        await axios.post(`${API_URL}/meal-plans`, { 
          userName, 
          planType, 
          meals: meals.split(','),
          status: 'Active'
        }, axiosConfig);
        alert('Meal plan created!');
        fetchMealPlans();
      } catch (error) {
        alert('Error creating meal plan');
      }
    }
  };

  const handleDeleteMealPlan = async (planId, userName) => {
    if (window.confirm(`Delete meal plan for ${userName}?`)) {
      try {
        await axios.delete(`${API_URL}/meal-plans/${planId}`, axiosConfig);
        alert('Meal plan deleted');
        fetchMealPlans();
      } catch (error) {
        alert('Error deleting meal plan');
      }
    }
  };

  // ========== COOKING GUIDANCE MANAGEMENT ==========
  const handleAddCookingGuidance = async () => {
    const title = prompt('Enter guidance title:');
    const step = prompt('Enter cooking step:');
    const tip = prompt('Enter cooking tip:');
    if (title) {
      try {
        await axios.post(`${API_URL}/cooking-guidance`, { 
          title, 
          step, 
          tip,
          likes: 0
        }, axiosConfig);
        alert('Cooking guidance added!');
        fetchCookingGuidance();
      } catch (error) {
        alert('Error adding guidance');
      }
    }
  };

  const handleDeleteGuidance = async (guidanceId, title) => {
    if (window.confirm(`Delete guidance "${title}"?`)) {
      try {
        await axios.delete(`${API_URL}/cooking-guidance/${guidanceId}`, axiosConfig);
        alert('Guidance deleted');
        fetchCookingGuidance();
      } catch (error) {
        alert('Error deleting guidance');
      }
    }
  };

  // ========== COOKING ALARM MANAGEMENT ==========
  const handleAddCookingAlarm = async () => {
    const alarmName = prompt('Enter alarm name:');
    const duration = prompt('Enter duration (minutes):');
    const recipe = prompt('Enter recipe name:');
    if (alarmName && duration) {
      try {
        await axios.post(`${API_URL}/cooking-alarms`, { 
          alarmName, 
          duration, 
          recipe,
          isActive: true
        }, axiosConfig);
        alert('Cooking alarm set!');
        fetchCookingAlarms();
      } catch (error) {
        alert('Error setting alarm');
      }
    }
  };

  const handleDeleteAlarm = async (alarmId, alarmName) => {
    if (window.confirm(`Delete alarm "${alarmName}"?`)) {
      try {
        await axios.delete(`${API_URL}/admin/alarms/${alarmId}`, axiosConfig);
        alert('Alarm deleted');
        fetchCookingAlarms();
      } catch (error) {
        alert('Error deleting alarm');
      }
    }
  };

  // ========== DAILY REPORT MANAGEMENT ==========
  const handleGenerateDailyReport = async () => {
    const date = prompt('Enter date (YYYY-MM-DD) or leave blank for today:');
    try {
      const response = await axios.post(`${API_URL}/daily-reports/generate`, { 
        date: date || new Date().toISOString().split('T')[0] 
      }, axiosConfig);
      setDailyReports([response.data, ...dailyReports]);
      alert('Daily report generated!');
    } catch (error) {
      alert('Error generating report');
    }
  };

  const handleViewReport = (report) => {
    alert(`Report: ${report.date}\nStatus: ${report.status || 'Generated'}`);
  };

  // ========== BILINGUAL SUPPORT ==========
  const toggleBilingualSupport = () => {
    setBilingualSupport(!bilingualSupport);
    alert(`Bilingual support ${!bilingualSupport ? 'enabled' : 'disabled'}`);
  };

  // ========== EXPORT DATA FUNCTION ==========
  const handleExportData = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalUsers: users.length,
      totalRecipes: recipes.length,
      totalActivities: userActivities.length,
      totalPantryItems: pantryItems.length,
      totalShoppingItems: shoppingItems.length,
      totalMealPlans: mealPlans.length,
      totalCookingAlarms: cookingAlarms.length,
      totalDailyReports: dailyReports.length,
      systemStatus: 'Active',
      uptime: '99.9%'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `chefbot_export_${new Date().toISOString().slice(0,19).replace(/:/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert(`Data exported successfully!\n\nTotal Users: ${users.length}\nTotal Recipes: ${recipes.length}\nTotal Activities: ${userActivities.length}\n\nFile saved as ${exportFileDefaultName}`);
  };

  // ========== SETTINGS MANAGEMENT ==========
  const handleUpdateSettings = () => {
    const newAppName = prompt('Enter app name:', settings.appName);
    if (newAppName) {
      setSettings({
        ...settings,
        appName: newAppName
      });
      alert('Settings updated!');
    }
  };

  const handleToggleEmailNotifications = () => {
    setSettings({
      ...settings,
      emailNotifications: !settings.emailNotifications
    });
    alert(`Email notifications ${!settings.emailNotifications ? 'enabled' : 'disabled'}`);
  };

  const handleTogglePushNotifications = () => {
    setSettings({
      ...settings,
      pushNotifications: !settings.pushNotifications
    });
    alert(`Push notifications ${!settings.pushNotifications ? 'enabled' : 'disabled'}`);
  };

  const handleToggleAutoBackup = () => {
    setSettings({
      ...settings,
      autoBackup: !settings.autoBackup
    });
    alert(`Auto backup ${!settings.autoBackup ? 'enabled' : 'disabled'}`);
  };

  const handleLanguageChange = () => {
    const newLanguage = prompt('Enter language (English, Urdu, Hindi, Arabic):', settings.language);
    if (newLanguage) {
      setSettings({
        ...settings,
        language: newLanguage
      });
      alert(`Language changed to ${newLanguage}`);
    }
  };

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    alert(`${newTheme === 'light' ? 'Light' : 'Dark'} mode enabled`);
  };
  
  const handleBackupDatabase = () => {
    alert('Database backup initiated. File will be downloaded shortly.');
  };

  // Load remembered email
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail, remember: true }));
    }
  }, []);

  // ========== FETCH DATA AFTER LOGIN ==========
  useEffect(() => {
    if (isLoggedIn && token) {
      fetchAllData();
    }
  }, [isLoggedIn, token]);

  // Calculate max value for chart
  const maxWeeklyActivity = weeklyActivity.length > 0 ? Math.max(...weeklyActivity.map(w => w.count)) : 100;
  const maxPopularRecipe = popularRecipes.length > 0 ? Math.max(...popularRecipes.map(r => r.views)) : 100;

  // ========== LOGIN/REGISTER SCREEN ==========
  if (!isLoggedIn) {
    return (
      <div className="login-page-wrapper">
        <div className="login-page-container">
          <div className="login-left-panel">
            <div className="login-logo-container">
              <div className="login-logo-circle">
                <span className="login-logo-emoji">🍳</span>
              </div>
              <div className="login-logo-text">
                <h1>ChefBot</h1>
                <p>Your AI Cooking Assistant</p>
              </div>
            </div>
            
            <div className="login-welcome-section">
              <h2>Welcome to ChefBot</h2>
              <p>Sign in to continue your culinary journey with personalized recipes and cooking guidance.</p>
            </div>
            
            <ul className="login-features-list">
              <li>Personalized Meal Suggestions</li>
              <li>Smart Shopping Lists</li>
              <li>Daily/Weekly Meal Planning</li>
              <li>Step-by-Step Cooking Guidance</li>
              <li>Cooking Timers & Alarms</li>
              <li>Daily Activity Reports</li>
              <li>Multi-Language Support</li>
              <li>And much more...</li>
            </ul>
          </div>
          
          <div className="login-right-panel">
            {!showRegister ? (
              <>
                <div className="login-form-header">
                  <h2>Welcome Back</h2>
                  <p>Login to access your ChefBot account</p>
                </div>
                
                <form className="login-form-container" onSubmit={handleSubmit}>
                  <div className="login-form-group">
                    <label className="login-form-label" htmlFor="email">Email Address</label>
                    <div className="login-input-wrapper">
                      <input
                        className="login-input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="login-form-group">
                    <label className="login-form-label" htmlFor="password">Password</label>
                    <div className="login-input-wrapper">
                      <input
                        className="login-input"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button 
                        type="button" 
                        className="login-password-toggle"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  
                  <div className="login-options">
                    <label className="login-remember">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleInputChange}
                      />
                      Remember me
                    </label>
                    <a href="#" className="login-forgot" onClick={(e) => { e.preventDefault(); handleForgetPassword(); }}>Forgot Password?</a>
                  </div>
                  
                  {loginError && <div className="login-error-message">{loginError}</div>}
                  
                  <button type="submit" className="login-submit-btn" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                  
                  <div className="login-switch">
                    <p>Don't have an account? <button type="button" className="switch-btn" onClick={() => setShowRegister(true)}>Create Account</button></p>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="login-form-header">
                  <h2>Create Account</h2>
                  <p>Join ChefBot and start your cooking journey</p>
                </div>
                
                <form className="login-form-container" onSubmit={handleRegisterSubmit}>
                  <div className="login-form-group">
                    <label className="login-form-label">Full Name</label>
                    <div className="login-input-wrapper">
                      <input
                        className="login-input"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={registerData.name}
                        onChange={handleRegisterInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="login-form-group">
                    <label className="login-form-label">Email Address</label>
                    <div className="login-input-wrapper">
                      <input
                        className="login-input"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={registerData.email}
                        onChange={handleRegisterInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="login-form-group">
                    <label className="login-form-label">Password</label>
                    <div className="login-input-wrapper">
                      <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={registerData.password}
                        onChange={handleRegisterInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="login-form-group">
                    <label className="login-form-label">Confirm Password</label>
                    <div className="login-input-wrapper">
                      <input
                        className="login-input"
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="login-options">
                    <label className="login-remember">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={registerData.agreeToTerms}
                        onChange={handleRegisterInputChange}
                      />
                      I agree to the Terms and Conditions
                    </label>
                  </div>
                  
                  {registerError && <div className="login-error-message">{registerError}</div>}
                  {registerSuccess && <div className="login-success-message">{registerSuccess}</div>}
                  
                  <button type="submit" className="login-submit-btn" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Register'}
                  </button>
                  
                  <div className="login-switch">
                    <p>Already have an account? <button type="button" className="switch-btn" onClick={() => setShowRegister(false)}>Login Here</button></p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ========== ADMIN DASHBOARD ==========
  return (
    <div className="chefbot-dashboard">
      <aside className="sidebar">
        <div className="logo-area">
          <img src="/Images/Logo.png" alt="ChefBot Logo" className="logo-image" />
          <h2>ChefBot</h2>
        </div>
        
        <nav className="nav-menu">
          <button className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => setActiveSection('dashboard')}>Overview</button>
          <button className={activeSection === 'users' ? 'active' : ''} onClick={() => setActiveSection('users')}>User Accounts</button>
          <button className={activeSection === 'activities' ? 'active' : ''} onClick={() => setActiveSection('activities')}>User Activities</button>
          <button className={activeSection === 'pantry' ? 'active' : ''} onClick={() => setActiveSection('pantry')}>Pantry Items</button>
          <button className={activeSection === 'shopping' ? 'active' : ''} onClick={() => setActiveSection('shopping')}>Shopping Items</button>
          <button className={activeSection === 'suggestions' ? 'active' : ''} onClick={() => setActiveSection('suggestions')}>Meal Suggestions</button>
          <button className={activeSection === 'collection' ? 'active' : ''} onClick={() => setActiveSection('collection')}>Recipe Collection</button>
          <button className={activeSection === 'mealplans' ? 'active' : ''} onClick={() => setActiveSection('mealplans')}>Meal Plans</button>
          <button className={activeSection === 'guidance' ? 'active' : ''} onClick={() => setActiveSection('guidance')}>Cooking Guidance</button>
          <button className={activeSection === 'alarms' ? 'active' : ''} onClick={() => setActiveSection('alarms')}>Cooking Alarms</button>
          <button className={activeSection === 'reports' ? 'active' : ''} onClick={() => setActiveSection('reports')}>Daily Reports</button>
          <button className={activeSection === 'bilingual' ? 'active' : ''} onClick={() => setActiveSection('bilingual')}>Bilingual Support</button>
          <button className={activeSection === 'settings' ? 'active' : ''} onClick={() => setActiveSection('settings')}>Settings</button>
        </nav>
      </aside>

      <main className="main-content">
        {activeSection === 'dashboard' && (
          <div className="section overview-section">
            {/* Date and Time at Top */}
            <div className="date-time-header">
              <div className="current-date">{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <div className="current-time">{currentTime.toLocaleTimeString()}</div>
            </div>

            {/* Welcome Section */}
            <div className="welcome-banner-simple">
              <div className="welcome-text-simple">
                <h2>Welcome back, Admin!</h2>
                <p>Here's what's happening with your ChefBot platform today.</p>
              </div>
            </div>

            {/* User Activity Overview - Dummy Live Graph */}
            <div className="activity-graph-container">
              <div className="graph-header">
                <h3>User Activity Overview</h3>
                <span className="graph-subtitle">Last 7 Days</span>
              </div>
              <div className="activity-graph-wrapper">
                <div className="activity-bars">
                  <div className="graph-bar-item"><div className="bar-label">Mon</div><div className="bar-wrapper"><div className="activity-bar" style={{ height: '65%' }}><span className="bar-tooltip">65</span></div></div></div>
                  <div className="graph-bar-item"><div className="bar-label">Tue</div><div className="bar-wrapper"><div className="activity-bar" style={{ height: '78%' }}><span className="bar-tooltip">78</span></div></div></div>
                  <div className="graph-bar-item"><div className="bar-label">Wed</div><div className="bar-wrapper"><div className="activity-bar" style={{ height: '82%' }}><span className="bar-tooltip">82</span></div></div></div>
                  <div className="graph-bar-item"><div className="bar-label">Thu</div><div className="bar-wrapper"><div className="activity-bar" style={{ height: '71%' }}><span className="bar-tooltip">71</span></div></div></div>
                  <div className="graph-bar-item"><div className="bar-label">Fri</div><div className="bar-wrapper"><div className="activity-bar" style={{ height: '89%' }}><span className="bar-tooltip">89</span></div></div></div>
                  <div className="graph-bar-item"><div className="bar-label">Sat</div><div className="bar-wrapper"><div className="activity-bar" style={{ height: '94%' }}><span className="bar-tooltip">94</span></div></div></div>
                  <div className="graph-bar-item"><div className="bar-label">Sun</div><div className="bar-wrapper"><div className="activity-bar" style={{ height: '86%' }}><span className="bar-tooltip">86</span></div></div></div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="overview-stats-grid">
              <div className="overview-stat-card" onClick={() => setActiveSection('users')}>
                <div className="overview-stat-info">
                  <h3>{users.length || 0}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="overview-stat-card" onClick={() => setActiveSection('activities')}>
                <div className="overview-stat-info">
                  <h3>{systemStats.totalActivities || 124}</h3>
                  <p>User Activities</p>
                </div>
              </div>
              <div className="overview-stat-card" onClick={() => setActiveSection('collection')}>
                <div className="overview-stat-info">
                  <h3>{(recipes.length + recipeCollection.length) || 156}</h3>
                  <p>Total Recipes</p>
                </div>
              </div>
              <div className="overview-stat-card" onClick={() => setActiveSection('suggestions')}>
                <div className="overview-stat-info">
                  <h3>{systemStats.totalSuggestions || 89}</h3>
                  <p>Meal Suggestions</p>
                </div>
              </div>
              <div className="overview-stat-card" onClick={() => setActiveSection('mealplans')}>
                <div className="overview-stat-info">
                  <h3>{mealPlans.length || 45}</h3>
                  <p>Meal Plans</p>
                </div>
              </div>
              <div className="overview-stat-card" onClick={() => setActiveSection('pantry')}>
                <div className="overview-stat-info">
                  <h3>{pantryItems.length || 234}</h3>
                  <p>Pantry Items</p>
                </div>
              </div>
              <div className="overview-stat-card" onClick={() => setActiveSection('shopping')}>
                <div className="overview-stat-info">
                  <h3>{shoppingItems.length || 167}</h3>
                  <p>Shopping Items</p>
                </div>
              </div>
              <div className="overview-stat-card" onClick={() => setActiveSection('guidance')}>
                <div className="overview-stat-info">
                  <h3>{cookingGuidance.length || 78}</h3>
                  <p>Cooking Tips</p>
                </div>
              </div>
              <div className="overview-stat-card" onClick={() => setActiveSection('alarms')}>
                <div className="overview-stat-info">
                  <h3>{cookingAlarms.length || 34}</h3>
                  <p>Cooking Alarms</p>
                </div>
              </div>
              <div className="overview-stat-card" onClick={() => setActiveSection('reports')}>
                <div className="overview-stat-info">
                  <h3>{dailyReports.length || 112}</h3>
                  <p>Daily Reports</p>
                </div>
              </div>
              <div className="overview-stat-card" onClick={() => setActiveSection('bilingual')}>
                <div className="overview-stat-info">
                  <h3>{bilingualSupport ? 'ON' : 'OFF'}</h3>
                  <p>Bilingual Support</p>
                </div>
              </div>
              <div className="overview-stat-card" onClick={() => setActiveSection('settings')}>
                <div className="overview-stat-info">
                  <h3>Ready</h3>
                  <p>System Settings</p>
                </div>
              </div>
            </div>

            {/* Most Popular Recipes - Horizontal Layout */}
            <div className="popular-recipes-horizontal">
              <h3>Most Popular Recipes</h3>
              <div className="popular-recipes-scroll">
                <div className="popular-recipe-card"><div className="pop-rank">1</div><div className="pop-recipe-name">Butter Chicken</div><div className="pop-views">234 views</div><div className="pop-bar-container"><div className="pop-bar" style={{ width: '95%' }}></div></div></div>
                <div className="popular-recipe-card"><div className="pop-rank">2</div><div className="pop-recipe-name">Chicken Biryani</div><div className="pop-views">198 views</div><div className="pop-bar-container"><div className="pop-bar" style={{ width: '88%' }}></div></div></div>
                <div className="popular-recipe-card"><div className="pop-rank">3</div><div className="pop-recipe-name">Mutton Karahi</div><div className="pop-views">167 views</div><div className="pop-bar-container"><div className="pop-bar" style={{ width: '76%' }}></div></div></div>
                <div className="popular-recipe-card"><div className="pop-rank">4</div><div className="pop-recipe-name">Chicken Pasta</div><div className="pop-views">145 views</div><div className="pop-bar-container"><div className="pop-bar" style={{ width: '67%' }}></div></div></div>
                <div className="popular-recipe-card"><div className="pop-rank">5</div><div className="pop-recipe-name">Malai Boti</div><div className="pop-views">123 views</div><div className="pop-bar-container"><div className="pop-bar" style={{ width: '59%' }}></div></div></div>
                <div className="popular-recipe-card"><div className="pop-rank">6</div><div className="pop-recipe-name">Chicken Corn Soup</div><div className="pop-views">98 views</div><div className="pop-bar-container"><div className="pop-bar" style={{ width: '52%' }}></div></div></div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="quick-action-btn" onClick={() => setActiveSection('users')}>Manage Users</button>
                <button className="quick-action-btn" onClick={() => setActiveSection('suggestions')}>Generate Suggestions</button>
                <button className="quick-action-btn" onClick={handleGenerateDailyReport}>Generate Report</button>
                <button className="quick-action-btn" onClick={() => setActiveSection('alarms')}>Set Alarm</button>
                <button className="quick-action-btn" onClick={() => setActiveSection('collection')}>Add Recipe</button>
                <button className="quick-action-btn" onClick={handleExportData}>Export Data</button>
              </div>
            </div>

            {/* System Health */}
            <div className="system-health">
              <h3>System Health</h3>
              <div className="health-stats">
                <div className="health-item"><div>Server Status</div><div className="online">Online</div></div>
                <div className="health-item"><div>Database Status</div><div className="online">Connected</div></div>
                <div className="health-item"><div>Uptime</div><div>99.9%</div></div>
                <div className="health-item"><div>Active Users</div><div>247</div></div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'users' && (
          <div className="section users-section">
            <div className="section-header"><h2>Manage User Accounts</h2></div>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center', padding: '30px'}}>No users registered yet</td>
                    </tr>
                  ) : (
                    users.map(user => (
                      <tr key={user._id}>
                        <td><strong>{user.name}</strong></td>
                        <td>{user.email}</td>
                        <td><span className={`status ${user.isBlocked ? 'inactive' : 'active'}`}>{user.isBlocked ? 'Blocked' : 'Active'}</span></td>
                        <td className="actions">
                          <button className="edit-btn" onClick={() => handleManageUserAccount(user)}>Manage</button>
                          <button className="edit-btn" onClick={() => handleBlockUser(user._id, user.name, user.isBlocked)}>{user.isBlocked ? 'Unblock' : 'Block'}</button>
                          <button className="delete-btn" onClick={() => handleDeleteUser(user._id, user.name)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {selectedUserDetails && (
              <div className="modal-overlay" onClick={() => setSelectedUserDetails(null)}>
                <div className="modal-content">
                  <h3>Manage User</h3>
                  <p><strong>Email:</strong> {selectedUserDetails.email}</p>
                  <div className="modal-actions">
                    <button className="primary-btn" onClick={handleUpdateUser}>Update Info</button>
                    <button className="close-btn" onClick={() => setSelectedUserDetails(null)}>Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'activities' && (
          <div className="section activities-section">
            <div className="section-header"><h2>User Activity Tracking</h2></div>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Activity Type</th>
                    <th>Timestamp</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {userActivities.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center', padding: '30px'}}>No activities recorded yet</td>
                    </tr>
                  ) : (
                    userActivities.map((activity, index) => (
                      <tr key={activity?._id || index}>
                        <td><strong>{activity?.userName || 'User'}</strong></td>
                        <td>{activity?.type || 'General Activity'}</td>
                        <td>{activity?.timestamp ? new Date(activity.timestamp).toLocaleString() : 'N/A'}</td>
                        <td>{activity?.description || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'pantry' && (
          <div className="section pantry-section">
            <div className="section-header"><h2>Pantry Items Management</h2><button className="primary-btn" onClick={handleAddPantryItem}>Add Pantry Item</button></div>
            <div className="items-grid">
              {pantryItems.length === 0 ? <p className="empty-msg">No pantry items added yet</p> :
                pantryItems.map(item => (
                  <div key={item._id} className="item-card">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Category: {item.category || 'General'}</p>
                    <button className="delete-btn" onClick={() => handleDeletePantryItem(item._id, item.name)}>Delete</button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeSection === 'shopping' && (
          <div className="section shopping-section">
            <div className="section-header"><h2>Shopping Items Master List</h2><button className="primary-btn" onClick={handleAddShoppingItem}>Add Shopping Item</button></div>
            <div className="category-filters">
              {shoppingCategories.map(cat => (
                <button key={cat} className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`} onClick={() => setSelectedCategory(cat)}>{cat}</button>
              ))}
            </div>
            <div className="items-grid">
              {shoppingItems.filter(item => selectedCategory === 'All' || item.category === selectedCategory).length === 0 ? <p className="empty-msg">No shopping items in this category</p> :
                shoppingItems.filter(item => selectedCategory === 'All' || item.category === selectedCategory).map(item => (
                  <div key={item._id} className="item-card">
                    <h3>{item.name}</h3>
                    <p>Default Qty: {item.quantity}</p>
                    <p>Category: <span className="category-badge">{item.category || 'General'}</span></p>
                    <div className="card-actions">
                      <button className="edit-btn" onClick={() => handleEditShoppingItem(item)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteShoppingItem(item._id, item.name)}>Delete</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeSection === 'suggestions' && (
          <div className="section suggestions-section">
            <div className="section-header"><h2>AI Meal Suggestions</h2><button className="primary-btn" onClick={handleGenerateMealSuggestions}>Generate Suggestions</button></div>
            <div className="items-grid">
              {mealSuggestions.length === 0 ? <p className="empty-msg">No meal suggestions yet</p> :
                mealSuggestions.map(suggestion => (
                  <div key={suggestion._id} className="item-card">
                    <h3>{suggestion.mealName}</h3>
                    <p>Type: {suggestion.type || 'Meal'}</p>
                    <p>Match Score: <span className="match-score">{suggestion.matchScore || 85}%</span></p>
                    <button className="delete-btn" onClick={() => handleDeleteSuggestion(suggestion._id, suggestion.mealName)}>Remove</button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeSection === 'collection' && (
          <div className="section collection-section">
            <div className="section-header"><h2>Recipe Collection</h2><button className="primary-btn" onClick={handleAddToCollection}>Add Recipe</button></div>
            <div className="items-grid">
              {recipeCollection.length === 0 ? <p className="empty-msg">No recipes in collection</p> :
                recipeCollection.map(recipe => (
                  <div key={recipe._id} className="item-card">
                    <h3>{recipe.recipeName}</h3>
                    <p>Category: {recipe.category || 'General'}</p>
                    <p>Prep Time: {recipe.prepTime || 30} mins</p>
                    <div className="card-actions">
                      <button className="edit-btn" onClick={() => handleEditRecipe(recipe)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteFromCollection(recipe._id, recipe.recipeName)}>Delete</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeSection === 'mealplans' && (
          <div className="section mealplans-section">
            <div className="section-header"><h2>Daily/Weekly Meal Plans</h2><button className="primary-btn" onClick={handleAddMealPlan}>Create Meal Plan</button></div>
            <div className="mealplans-grid">
              {mealPlans.length === 0 ? <p className="empty-msg">No meal plans created yet</p> :
                mealPlans.map(plan => (
                  <div key={plan._id} className="mealplan-card">
                    <h3>{plan.userName}'s {plan.planType} Plan</h3>
                    <div className="meal-list">
                      {plan.meals?.map((meal, idx) => <div key={idx}>• {meal}</div>)}
                    </div>
                    <button className="delete-btn" onClick={() => handleDeleteMealPlan(plan._id, plan.userName)}>Delete Plan</button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeSection === 'guidance' && (
          <div className="section guidance-section">
            <div className="section-header"><h2>Cooking Guidance & Tips</h2><button className="primary-btn" onClick={handleAddCookingGuidance}>Add Tip</button></div>
            <div className="guidance-grid">
              {cookingGuidance.length === 0 ? <p className="empty-msg">No cooking guidance added yet</p> :
                cookingGuidance.map(guide => (
                  <div key={guide._id} className="guidance-card">
                    <h3>{guide.title}</h3>
                    <p>Step: {guide.step}</p>
                    <p>Tip: {guide.tip}</p>
                    <button className="delete-btn" onClick={() => handleDeleteGuidance(guide._id, guide.title)}>Delete</button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeSection === 'alarms' && (
          <div className="section alarms-section">
            <div className="section-header"><h2>Cooking Alarm Templates</h2><button className="primary-btn" onClick={handleAddCookingAlarm}>Set Alarm</button></div>
            <div className="items-grid">
              {cookingAlarms.length === 0 ? <p className="empty-msg">No alarm templates set</p> :
                cookingAlarms.map(alarm => (
                  <div key={alarm._id} className="item-card">
                    <h3>{alarm.alarmName}</h3>
                    <p>Duration: {alarm.duration} minutes</p>
                    <p>For Recipe: {alarm.recipe || 'Any recipe'}</p>
                    <p>User: {alarm.userName || 'User'}</p>
                    <button className="delete-btn" onClick={() => handleDeleteAlarm(alarm._id, alarm.alarmName)}>Delete</button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeSection === 'reports' && (
          <div className="section reports-section">
            <div className="section-header"><h2>Daily Activity Reports</h2><button className="primary-btn" onClick={handleGenerateDailyReport}>Generate Report</button></div>
            <div className="reports-grid">
              {dailyReports.length === 0 ? <p className="empty-msg">No reports generated yet</p> :
                dailyReports.map(report => (
                  <div key={report._id} className="report-card" onClick={() => handleViewReport(report)}>
                    <h3>Report: {report.date}</h3>
                    <p>Status: {report.status || 'Generated'}</p>
                    <p><small>Click to view details</small></p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeSection === 'bilingual' && (
          <div className="section bilingual-section">
            <div className="section-header"><h2>Bilingual Support</h2></div>
            <div className="settings-card">
              <div className="setting-item">
                <div><h3>Enable Bilingual Support</h3><p>Allow users to switch between multiple languages</p></div>
                <button className={bilingualSupport ? "toggle-btn active" : "toggle-btn"} onClick={toggleBilingualSupport}>
                  {bilingualSupport ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              {bilingualSupport && <div className="info-banner">Available languages: English, Urdu, Hindi, Arabic</div>}
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="section settings-section">
            <div className="section-header"><h2>System Settings</h2></div>
            
            <div className="settings-group"><h3>Appearance</h3>
              <div className="setting-row"><label>Theme Mode</label><div className="setting-value"><span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span><button className="edit-btn" onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'}</button></div></div>
            </div>

            <div className="settings-group"><h3>General Settings</h3>
              <div className="setting-row"><label>App Name</label><div className="setting-value"><span>{settings.appName}</span><button className="edit-btn" onClick={handleUpdateSettings}>Edit</button></div></div>
              <div className="setting-row"><label>Interface Language</label><div className="setting-value"><span>{settings.language}</span><button className="edit-btn" onClick={handleLanguageChange}>Change</button></div></div>
              <div className="setting-row"><label>Date Format</label><div className="setting-value"><span>{settings.dateFormat}</span><button className="edit-btn" onClick={handleUpdateSettings}>Change</button></div></div>
              <div className="setting-row"><label>Currency Display</label><div className="setting-value"><span>{settings.currency}</span><button className="edit-btn" onClick={handleUpdateSettings}>Change</button></div></div>
            </div>

            <div className="settings-group"><h3>Notifications</h3>
              <div className="setting-row"><label>Email Notifications</label><div className="setting-value"><span>{settings.emailNotifications ? 'Enabled' : 'Disabled'}</span><button className="edit-btn" onClick={handleToggleEmailNotifications}>Toggle</button></div></div>
              <div className="setting-row"><label>Push Notifications</label><div className="setting-value"><span>{settings.pushNotifications ? 'Enabled' : 'Disabled'}</span><button className="edit-btn" onClick={handleTogglePushNotifications}>Toggle</button></div></div>
            </div>

            <div className="settings-group"><h3>Backup & Security</h3>
              <div className="setting-row"><label>Auto Database Backup</label><div className="setting-value"><span>{settings.autoBackup ? 'Enabled (Daily)' : 'Disabled'}</span><button className="edit-btn" onClick={handleToggleAutoBackup}>Toggle</button></div></div>
              <div className="setting-row"><label>Manual Backup</label><div className="setting-value"><button className="primary-btn" onClick={handleBackupDatabase}>Backup Now</button></div></div>
            </div>

            <div className="settings-group"><h3>Password Management</h3>
              <div className="button-group"><button className="secondary-btn" onClick={handleForgetPassword}>Forget Password</button><button className="secondary-btn" onClick={handleResetPassword}>Reset Password</button></div>
              <p className="info-text">Users can reset their own passwords. This is for admin password recovery.</p>
            </div>

            <div className="settings-group"><h3>Account</h3>
              <div className="setting-row"><label>Logout from Account</label><div className="setting-value"><button className="logout-setting-btn" onClick={handleLogout}>Logout</button></div></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;