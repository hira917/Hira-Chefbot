// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAV8U_xWxrji2r42Rb2WMU6avjxk7wZbSw",
//   authDomain: "chefbot-9975a.firebaseapp.com",
//   projectId: "chefbot-9975a",
//   storageBucket: "chefbot-9975a.firebasestorage.app",
//   messagingSenderId: "308081229545",
//   appId: "1:308081229545:web:ac4279d200b1add41cba78"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword 
} from 'firebase/auth';

// 🔥 APNI FIREBASE CONFIG YAHAN PASTE KARO (Firebase Console se copy karo)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ========== COLLECTION REFERENCES ==========
const usersCollection = collection(db, 'users');
const recipesCollection = collection(db, 'recipes');
const pantryCollection = collection(db, 'pantry');
const shoppingListCollection = collection(db, 'shoppingList');
const mealPlansCollection = collection(db, 'mealPlans');
const alarmsCollection = collection(db, 'alarms');
const dailyReportsCollection = collection(db, 'dailyReports');
const categoriesCollection = collection(db, 'categories');
const guidanceCollection = collection(db, 'guidance');

// ========== AUTHENTICATION ==========
export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ========== USER MANAGEMENT (ADMIN) ==========
export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(usersCollection, {
      ...userData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateUserStatus = async (userId, status, blocked) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { status, blocked });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, 'users', userId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllUsers = (callback) => {
  return onSnapshot(usersCollection, (snapshot) => {
    const users = [];
    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    callback(users);
  });
};

// ========== RECIPES MANAGEMENT (FULL CRUD) ==========
export const addRecipe = async (recipeData) => {
  try {
    const docRef = await addDoc(recipesCollection, {
      ...recipeData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateRecipe = async (recipeId, recipeData) => {
  try {
    const recipeRef = doc(db, 'recipes', recipeId);
    await updateDoc(recipeRef, recipeData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteRecipe = async (recipeId) => {
  try {
    await deleteDoc(doc(db, 'recipes', recipeId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllRecipes = (callback) => {
  return onSnapshot(recipesCollection, (snapshot) => {
    const recipes = [];
    snapshot.forEach((doc) => {
      recipes.push({ id: doc.id, ...doc.data() });
    });
    callback(recipes);
  });
};

// ========== PANTRY MANAGEMENT (ADMIN VIEW) ==========
export const getAllPantry = (callback) => {
  return onSnapshot(pantryCollection, (snapshot) => {
    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    callback(items);
  });
};

export const updatePantryItem = async (itemId, quantity) => {
  try {
    const itemRef = doc(db, 'pantry', itemId);
    await updateDoc(itemRef, { quantity, lowStock: quantity < 2 });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deletePantryItem = async (itemId) => {
  try {
    await deleteDoc(doc(db, 'pantry', itemId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ========== SHOPPING LISTS ==========
export const getAllShoppingLists = (callback) => {
  return onSnapshot(shoppingListCollection, (snapshot) => {
    const lists = [];
    snapshot.forEach((doc) => {
      lists.push({ id: doc.id, ...doc.data() });
    });
    callback(lists);
  });
};

export const deleteShoppingList = async (listId) => {
  try {
    await deleteDoc(doc(db, 'shoppingList', listId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ========== MEAL PLANS ==========
export const getAllMealPlans = (callback) => {
  return onSnapshot(mealPlansCollection, (snapshot) => {
    const plans = [];
    snapshot.forEach((doc) => {
      plans.push({ id: doc.id, ...doc.data() });
    });
    callback(plans);
  });
};

export const deleteMealPlan = async (planId) => {
  try {
    await deleteDoc(doc(db, 'mealPlans', planId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ========== ALARMS ==========
export const getAllAlarms = (callback) => {
  return onSnapshot(alarmsCollection, (snapshot) => {
    const alarms = [];
    snapshot.forEach((doc) => {
      alarms.push({ id: doc.id, ...doc.data() });
    });
    callback(alarms);
  });
};

export const deleteAlarm = async (alarmId) => {
  try {
    await deleteDoc(doc(db, 'alarms', alarmId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ========== BEGINNER GUIDE (FULL CRUD) ==========
export const addGuidance = async (title, category, content) => {
  try {
    const docRef = await addDoc(guidanceCollection, { title, category, content, createdAt: serverTimestamp() });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateGuidance = async (guideId, title, content) => {
  try {
    const guideRef = doc(db, 'guidance', guideId);
    await updateDoc(guideRef, { title, content });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteGuidance = async (guideId) => {
  try {
    await deleteDoc(doc(db, 'guidance', guideId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllGuidance = (callback) => {
  return onSnapshot(guidanceCollection, (snapshot) => {
    const guides = [];
    snapshot.forEach((doc) => {
      guides.push({ id: doc.id, ...doc.data() });
    });
    callback(guides);
  });
};

// ========== CATEGORIES ==========
export const addCategory = async (name) => {
  try {
    const docRef = await addDoc(categoriesCollection, { name, count: 0 });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllCategories = (callback) => {
  return onSnapshot(categoriesCollection, (snapshot) => {
    const cats = [];
    snapshot.forEach((doc) => {
      cats.push({ id: doc.id, ...doc.data() });
    });
    callback(cats);
  });
};

// ========== DAILY REPORTS ==========
export const getAllDailyReports = (callback) => {
  return onSnapshot(dailyReportsCollection, (snapshot) => {
    const reports = [];
    snapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() });
    });
    callback(reports);
  });
};

// ========== SYSTEM STATS ==========
export const getSystemStatsFromDB = async () => {
  try {
    const usersSnap = await getDocs(usersCollection);
    const recipesSnap = await getDocs(recipesCollection);
    const mealPlansSnap = await getDocs(mealPlansCollection);
    
    return {
      totalUsers: usersSnap.size,
      totalRecipes: recipesSnap.size,
      totalMealPlans: mealPlansSnap.size,
    };
  } catch (error) {
    return { error: error.message };
  }
};

export { db, auth };