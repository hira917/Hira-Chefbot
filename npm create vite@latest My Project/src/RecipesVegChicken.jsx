import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesVegChicken.css';

const RecipesVegChicken = () => {
  const navigate = useNavigate();
  const [chickenVegRecipes, setChickenVegRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // Fetch veg-chicken recipes only
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/recipes/subCategory/veg-chicken?limit=200')
      .then(res => res.json())
      .then(data => {
        setChickenVegRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  }, []);

  const speakInstructions = (instructions, stepIndex = 0) => {
    if ('speechSynthesis' in window) {
      if (speechSynthesisRef.current && isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setCurrentStep(0);
        setProgress(0);
        speechSynthesisRef.current = null;
        return;
      }
      if (stepIndex >= 0 && stepIndex < instructions.length) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = `Step ${stepIndex + 1}: ${instructions[stepIndex]}`;
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        setCurrentStep(stepIndex + 1);
        setProgress(((stepIndex + 1) / instructions.length) * 100);
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => { setIsPlaying(false); speechSynthesisRef.current = null; };
        utterance.onerror = () => { setIsPlaying(false); speechSynthesisRef.current = null; };
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
    if (selectedRecipe && currentStep < selectedRecipe.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedRecipe.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedRecipe && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedRecipe.stepsRaw, currentStep - 2);
    }
  };

  const handleRecipeClick = (recipe) => {
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

  if (loading) {
    return (
      <div className="chicken-veg-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chicken-veg-page">
      <header className="chicken-veg-header">
        <div className="chicken-veg-header-content">
          <h1 className="chicken-veg-page-title">Chicken & Vegetable Curries</h1>
          <p className="chicken-veg-page-description">
            Discover delicious chicken recipes with vegetables - perfect for lunch and dinner
          </p>
        </div>
      </header>

      <main className="chicken-veg-main">
        <div className="chicken-veg-grid-section">
          <div className="chicken-veg-grid">
            {chickenVegRecipes.map(recipe => (
              <div
                key={recipe._id}
                className="chicken-veg-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="chicken-veg-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                <div className="chicken-veg-card-content">
                  <h3 className="chicken-veg-card-title">{recipe.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate('/')}>
          <span>←</span> Back to Home
        </button>
      </div>

      {showDetailPanel && selectedRecipe && (
        <div className="chicken-veg-modal-overlay" onClick={closeDetailPanel}>
          <div className="chicken-veg-modal" onClick={e => e.stopPropagation()}>
            <div className="veg-modal-hero">
              <div className="veg-modal-hero-left">
                <span className="veg-modal-tag">
                  {selectedRecipe.category || 'Chicken Recipe'}
                </span>
                <h2 className="veg-modal-hero-title">{selectedRecipe.title}</h2>
                {selectedRecipe.tagline && (
                  <p className="veg-modal-hero-tagline">{selectedRecipe.tagline}</p>
                )}
              </div>
              <div className="veg-modal-hero-right">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="veg-modal-hero-img"
                />
              </div>
              <button className="vegetables-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="veg-modal-body">
              <div className="veg-modal-col">
                <div className="veg-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="veg-modal-scroll">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="veg-ingredient-item">
                      <span className="veg-ingredient-dot"></span>
                      <span className="veg-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="veg-modal-col veg-modal-col--steps">
                <div className="veg-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="veg-modal-scroll">
                  {selectedRecipe.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="veg-step-item">
                      <span className="veg-step-num">{idx + 1}</span>
                      <span className="veg-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="veg-voice-bar">
              <div className="veg-voice-left">
                <i className="fas fa-volume-up veg-voice-icon"></i>
                <span className="veg-voice-label">Voice Guide</span>
              </div>

              <div className="veg-voice-progress">
                <div className="veg-progress-track">
                  <div className="veg-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="veg-progress-info">
                  <span>Step {currentStep} of {selectedRecipe.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="veg-voice-controls">
                <button
                  className="veg-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`veg-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRecipe.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="veg-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedRecipe.stepsRaw?.length || 0)}
                >
                  Next <i className="fas fa-step-forward"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesVegChicken;