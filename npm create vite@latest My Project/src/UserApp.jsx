import React, { useState, useEffect } from 'react';
import './UserApp.css';

// ========== FIREBASE IMPORTS ==========
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

// ========== 🔥 YOUR FIREBASE CONFIG (ADDED) ==========
const firebaseConfig = {
  apiKey: "AIzaSyAV8U_xWxrji2r42Rb2WMU6avjxk7wZbSw",
  authDomain: "chefbot-9975a.firebaseapp.com",
  projectId: "chefbot-9975a",
  storageBucket: "chefbot-9975a.firebasestorage.app",
  messagingSenderId: "308081229545",
  appId: "1:308081229545:web:ac4279d200b1add41cba78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Collection References
const usersCollection = collection(db, 'users');
const pantryCollection = collection(db, 'pantry');
const shoppingListCollection = collection(db, 'shoppingList');
const mealPlansCollection = collection(db, 'mealPlans');
const alarmsCollection = collection(db, 'alarms');

const UserApp = () => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // User Data States
  const [pantryItems, setPantryItems] = useState([]);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [activeTab, setActiveTab] = useState('pantry');
  
  // New Item Form
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('kg');
  const [searchTerm, setSearchTerm] = useState('');

  // ========== AUTHENTICATION FUNCTIONS ==========
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 1. Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Save user details in Firestore
      await addDoc(usersCollection, {
        uid: userCredential.user.uid,
        name: name,
        email: email,
        role: 'user',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        mealsPlanned: 0,
        blocked: false,
        createdAt: serverTimestamp()
      });
      
      alert('✅ Registration successful! You are now logged in.');
      
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('✅ Login successful!');
    } catch (err) {
      setError('Invalid email or password!');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setPantryItems([]);
    setShoppingItems([]);
    setMealPlans([]);
    alert('✅ Logged out successfully!');
  };

  // ========== REAL-TIME DATA LISTENERS (After Login) ==========
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // Get user document from Firestore
        const q = query(usersCollection, where('uid', '==', currentUser.uid));
        const unsubscribeUser = onSnapshot(q, (snapshot) => {
          snapshot.forEach((doc) => {
            localStorage.setItem('userDocId', doc.id);
          });
        });
        
        // Listen to user's pantry items
        const pantryQuery = query(pantryCollection, where('userId', '==', currentUser.uid));
        const unsubscribePantry = onSnapshot(pantryQuery, (snapshot) => {
          const items = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setPantryItems(items);
        });
        
        // Listen to user's shopping list
        const shoppingQuery = query(shoppingListCollection, where('userId', '==', currentUser.uid));
        const unsubscribeShopping = onSnapshot(shoppingQuery, (snapshot) => {
          const items = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setShoppingItems(items);
        });
        
        // Listen to user's meal plans
        const mealQuery = query(mealPlansCollection, where('userId', '==', currentUser.uid));
        const unsubscribeMeal = onSnapshot(mealQuery, (snapshot) => {
          const plans = [];
          snapshot.forEach((doc) => {
            plans.push({ id: doc.id, ...doc.data() });
          });
          setMealPlans(plans);
        });
        
        return () => {
          unsubscribeUser();
          unsubscribePantry();
          unsubscribeShopping();
          unsubscribeMeal();
        };
      } else {
        setUser(null);
      }
    });
    
    return () => unsubscribe();
  }, []);

  // ========== PANTRY FUNCTIONS ==========
  const addPantryItem = async () => {
    if (!newItemName || !newItemQuantity) {
      alert('Please enter item name and quantity!');
      return;
    }
    
    try {
      await addDoc(pantryCollection, {
        userId: user.uid,
        userName: user.email?.split('@')[0],
        itemName: newItemName,
        quantity: parseFloat(newItemQuantity),
        unit: newItemUnit,
        lowStock: parseFloat(newItemQuantity) < 2,
        createdAt: serverTimestamp()
      });
      
      setNewItemName('');
      setNewItemQuantity('');
      alert('✅ Item added to pantry!');
    } catch (err) {
      alert('Error adding item: ' + err.message);
    }
  };

  const updatePantryItem = async (itemId, currentQuantity) => {
    const newQuantity = prompt('Enter new quantity:', currentQuantity);
    if (newQuantity && !isNaN(newQuantity)) {
      try {
        const itemRef = doc(db, 'pantry', itemId);
        await updateDoc(itemRef, {
          quantity: parseFloat(newQuantity),
          lowStock: parseFloat(newQuantity) < 2
        });
        alert('✅ Item updated!');
      } catch (err) {
        alert('Error updating item');
      }
    }
  };

  const deletePantryItem = async (itemId, itemName) => {
    if (window.confirm(`Delete "${itemName}" from pantry?`)) {
      try {
        await deleteDoc(doc(db, 'pantry', itemId));
        alert('✅ Item deleted!');
      } catch (err) {
        alert('Error deleting item');
      }
    }
  };

  // ========== SHOPPING LIST FUNCTIONS ==========
  const addShoppingItem = async () => {
    if (!newItemName || !newItemQuantity) {
      alert('Please enter item name and quantity!');
      return;
    }
    
    try {
      await addDoc(shoppingListCollection, {
        userId: user.uid,
        userName: user.email?.split('@')[0],
        items: [{ name: newItemName, quantity: parseFloat(newItemQuantity), unit: newItemUnit }],
        createdAt: serverTimestamp()
      });
      
      setNewItemName('');
      setNewItemQuantity('');
      alert('✅ Item added to shopping list!');
    } catch (err) {
      alert('Error adding item: ' + err.message);
    }
  };

  const deleteShoppingItem = async (listId) => {
    if (window.confirm('Delete this shopping item?')) {
      try {
        await deleteDoc(doc(db, 'shoppingList', listId));
        alert('✅ Item deleted!');
      } catch (err) {
        alert('Error deleting item');
      }
    }
  };

  // ========== MEAL PLAN FUNCTIONS ==========
  const createMealPlan = async () => {
    const duration = prompt('Enter duration (Daily/Weekly):', 'Weekly');
    if (duration) {
      try {
        await addDoc(mealPlansCollection, {
          userId: user.uid,
          userName: user.email?.split('@')[0],
          duration: duration,
          startDate: new Date().toISOString().split('T')[0],
          meals: ['Sample Meal 1', 'Sample Meal 2'],
          createdAt: serverTimestamp()
        });
        alert('✅ Meal plan created!');
      } catch (err) {
        alert('Error creating meal plan');
      }
    }
  };

  const deleteMealPlan = async (planId) => {
    if (window.confirm('Delete this meal plan?')) {
      try {
        await deleteDoc(doc(db, 'mealPlans', planId));
        alert('✅ Meal plan deleted!');
      } catch (err) {
        alert('Error deleting meal plan');
      }
    }
  };

  // Filter pantry items by search
  const filteredPantry = pantryItems.filter(item =>
    item.itemName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ========== LOGIN/REGISTER SCREEN ==========
  if (!user) {
    return (
      <div className="user-auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-logo">👨‍🍳</span>
            <h1>ChefBot</h1>
            <p>Your AI Cooking Assistant</p>
          </div>
          
          <div className="auth-tabs">
            <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
            <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Sign Up</button>
          </div>
          
          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            {!isLogin && (
              <div className="input-group">
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
            
            <div className="input-group">
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            
            <div className="input-group password-group">
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Loading...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>🍽️ Smart Pantry Management</p>
            <p>📅 Meal Planning & Suggestions</p>
            <p>🛒 Digital Shopping Lists</p>
          </div>
        </div>
      </div>
    );
  }

  // ========== USER DASHBOARD (After Login) ==========
  return (
    <div className="user-dashboard">
      <header className="user-header">
        <div className="logo">
          <span>👨‍🍳</span>
          <h2>ChefBot</h2>
        </div>
        <div className="user-info">
          <span>👋 Hello, {user.email?.split('@')[0]}</span>
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </header>
      
      <div className="user-tabs">
        <button className={activeTab === 'pantry' ? 'active' : ''} onClick={() => setActiveTab('pantry')}>
          🥬 My Pantry
        </button>
        <button className={activeTab === 'shopping' ? 'active' : ''} onClick={() => setActiveTab('shopping')}>
          🛒 Shopping List
        </button>
        <button className={activeTab === 'mealplans' ? 'active' : ''} onClick={() => setActiveTab('mealplans')}>
          📅 Meal Plans
        </button>
      </div>
      
      <div className="user-content">
        {/* PANTRY TAB */}
        {activeTab === 'pantry' && (
          <div className="pantry-section">
            <div className="add-item-form">
              <input type="text" placeholder="Item name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
              <input type="number" placeholder="Quantity" value={newItemQuantity} onChange={(e) => setNewItemQuantity(e.target.value)} />
              <select value={newItemUnit} onChange={(e) => setNewItemUnit(e.target.value)}>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="pcs">pcs</option>
              </select>
              <button className="add-btn" onClick={addPantryItem}>+ Add Item</button>
            </div>
            
            <div className="search-bar">
              <input type="text" placeholder="🔍 Search pantry items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            
            <div className="items-list">
              {filteredPantry.length === 0 && <p className="empty-msg">No items in pantry. Add some!</p>}
              {filteredPantry.map(item => (
                <div key={item.id} className={`item-card ${item.lowStock ? 'low-stock' : ''}`}>
                  <div className="item-info">
                    <span className="item-name">{item.itemName}</span>
                    <span className="item-quantity">{item.quantity} {item.unit}</span>
                    {item.lowStock && <span className="low-stock-badge">⚠️ Low Stock</span>}
                  </div>
                  <div className="item-actions">
                    <button className="edit-btn" onClick={() => updatePantryItem(item.id, item.quantity)}>✏️</button>
                    <button className="delete-btn" onClick={() => deletePantryItem(item.id, item.itemName)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* SHOPPING LIST TAB */}
        {activeTab === 'shopping' && (
          <div className="shopping-section">
            <div className="add-item-form">
              <input type="text" placeholder="Item name" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
              <input type="number" placeholder="Quantity" value={newItemQuantity} onChange={(e) => setNewItemQuantity(e.target.value)} />
              <select value={newItemUnit} onChange={(e) => setNewItemUnit(e.target.value)}>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="pcs">pcs</option>
              </select>
              <button className="add-btn" onClick={addShoppingItem}>+ Add to List</button>
            </div>
            
            <div className="items-list">
              {shoppingItems.length === 0 && <p className="empty-msg">Shopping list is empty. Add items!</p>}
              {shoppingItems.map(item => (
                <div key={item.id} className="item-card">
                  <div className="item-info">
                    <span className="item-name">{item.items?.[0]?.name || 'Item'}</span>
                    <span className="item-quantity">{item.items?.[0]?.quantity || 0} {item.items?.[0]?.unit || ''}</span>
                  </div>
                  <button className="delete-btn" onClick={() => deleteShoppingItem(item.id)}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* MEAL PLANS TAB */}
        {activeTab === 'mealplans' && (
          <div className="mealplans-section">
            <button className="create-plan-btn" onClick={createMealPlan}>+ Create New Meal Plan</button>
            
            <div className="mealplans-list">
              {mealPlans.length === 0 && <p className="empty-msg">No meal plans yet. Create one!</p>}
              {mealPlans.map(plan => (
                <div key={plan.id} className="mealplan-card">
                  <h3>{plan.duration} Plan</h3>
                  <p className="plan-date">Started: {plan.startDate}</p>
                  <div className="meal-items">
                    {plan.meals?.map((meal, idx) => <span key={idx} className="meal-tag">🍽️ {meal}</span>)}
                  </div>
                  <button className="delete-btn" onClick={() => deleteMealPlan(plan.id)}>Delete Plan</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserApp;