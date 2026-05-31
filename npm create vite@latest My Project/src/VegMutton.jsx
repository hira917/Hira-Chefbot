import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './VegMutton.css';

const VegMutton = () => {
  const navigate = useNavigate();
  const [vegMuttonRecipes, setVegMuttonRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH ONLY MUTTON RECIPES (filter by title starting with "Mutton")
  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/plain-vegetables?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch mutton recipes');
        }
        return res.json();
      })
      .then(data => {
        // Filter: Only show recipes that start with "Mutton"
        const muttonOnly = (data.recipes || []).filter(recipe => 
          recipe.title && recipe.title.toLowerCase().startsWith('mutton')
        );
        setVegMuttonRecipes(muttonOnly);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching mutton recipes:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

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

  // Loading state
  if (loading) {
    return (
      <div className="veg-mutton-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious mutton recipes...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="veg-mutton-page">
        <div className="error-container">
          <p>Error loading recipes: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="veg-mutton-page">
      {/* Header */}
      <header className="veg-mutton-header">
        <div className="veg-mutton-header-content">
          <h1 className="veg-mutton-page-title">Mutton & Vegetable Curry Collection</h1>
          <p className="veg-mutton-page-description">
            A curated selection of delicious mutton curries combined with fresh vegetables for a complete meal.
          </p>
        </div>
      </header>

      {/* Recipes Grid */}
      <main className="veg-mutton-main">
        <div className="veg-mutton-grid-section">
          <div className="veg-mutton-grid">
            {vegMuttonRecipes.length === 0 ? (
              <div className="no-recipes-message">
                <p>No mutton recipes found.</p>
              </div>
            ) : (
              vegMuttonRecipes.map(recipe => (
                <div 
                  key={recipe._id} 
                  className="veg-mutton-technique-card"
                  onClick={() => handleRecipeSelect(recipe)}
                >
                  <div 
                    className="veg-mutton-card-image"
                    style={{ backgroundImage: `url(${recipe.image})` }}
                  ></div>
                  
                  <div className="veg-mutton-card-content">
                    <h3 className="veg-mutton-card-title">{recipe.title}</h3>
                    <p className="veg-mutton-card-description">{recipe.tagline || 'A flavorful mutton curry'}</p>
                  </div>
                </div>
              ))
            )}
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
        <div className="veg-mutton-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="veg-mutton-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="veg-mutton-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="veg-mutton-modal-header">
              <div className="veg-mutton-modal-title">
                <h2>{selectedRecipe.title}</h2>
              </div>
            </div>

            <div className="veg-mutton-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="veg-mutton-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="veg-mutton-ingredients-list">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="veg-mutton-ingredient-item">
                      <span className="veg-mutton-ingredient-bullet">•</span>
                      <span className="veg-mutton-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="veg-mutton-modal-steps">
                <h3>Steps to Make</h3>
                <div className="veg-mutton-steps-list">
                  {selectedRecipe.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="veg-mutton-step-item">
                      <span className="veg-mutton-step-number">{idx + 1}.</span>
                      <span className="veg-mutton-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="veg-mutton-modal-voice-container">
                <div className="voice-panel">
                  <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedRecipe.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRecipe.stepsRaw)}
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
                        disabled={currentStep >= (selectedRecipe.stepsRaw?.length || 0)}
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

export default VegMutton;