import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesPureMutton.css';

const RecipesPureMutton = () => {
  const navigate = useNavigate();
  const [muttonRecipes, setMuttonRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH MUTTON RECIPES FROM BACKEND
  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/pure-mutton?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch mutton recipes');
        }
        return res.json();
      })
      .then(data => {
        setMuttonRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching mutton recipes:', error);
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
        utterance.onend = () => { 
          setIsPlaying(false); 
          speechSynthesisRef.current = null;
          // Auto-advance to next step when current step finishes
          if (stepIndex < instructions.length - 1) {
            setTimeout(() => {
              speakInstructions(instructions, stepIndex + 1);
            }, 1000);
          }
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

  if (loading) {
    return (
      <div className="pure-mutton-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious mutton recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pure-mutton-page">
      <header className="pure-mutton-header">
        <div className="pure-mutton-header-content">
          <h1 className="pure-mutton-page-title">Pure Mutton Dishes</h1>
          <p className="pure-mutton-page-description">
            Discover traditional Pakistani mutton recipes - rich, flavorful, and perfect for special occasions
          </p>
        </div>
      </header>

      <main className="pure-mutton-main">
        <div className="pure-mutton-grid-section">
          <div className="pure-mutton-grid">
            {muttonRecipes.map(recipe => (
              <div
                key={recipe._id}
                className="pure-mutton-card"
                onClick={() => handleRecipeSelect(recipe)}
              >
                <div
                  className="pure-mutton-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                <div className="pure-mutton-card-content">
                  <h3 className="pure-mutton-card-title">{recipe.title}</h3>
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
        <div className="pure-mutton-modal-overlay" onClick={closeDetailPanel}>
          <div className="pure-mutton-modal" onClick={e => e.stopPropagation()}>
            <div className="mutton-modal-hero">
              <div className="mutton-modal-hero-left">
                <span className="mutton-modal-tag">Mutton Recipe</span>
                <h2 className="mutton-modal-hero-title">{selectedRecipe.title}</h2>
                {selectedRecipe.tagline && (
                  <p className="mutton-modal-hero-tagline">{selectedRecipe.tagline}</p>
                )}
              </div>
              <div className="mutton-modal-hero-right">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="mutton-modal-hero-img"
                />
              </div>
              <button className="pure-mutton-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="mutton-modal-body">
              <div className="mutton-modal-col">
                <div className="mutton-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="mutton-modal-scroll">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="mutton-ingredient-item">
                      <span className="mutton-ingredient-dot"></span>
                      <span className="mutton-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mutton-modal-col mutton-modal-col--steps">
                <div className="mutton-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="mutton-modal-scroll">
                  {selectedRecipe.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="mutton-step-item">
                      <span className="mutton-step-num">{idx + 1}</span>
                      <span className="mutton-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mutton-voice-bar">
              <div className="mutton-voice-left">
                <i className="fas fa-volume-up mutton-voice-icon"></i>
                <span className="mutton-voice-label">Voice Guide</span>
              </div>

              <div className="mutton-voice-progress">
                <div className="mutton-progress-track">
                  <div className="mutton-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="mutton-progress-info">
                  <span>Step {currentStep} of {selectedRecipe.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="mutton-voice-controls">
                <button
                  className="mutton-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`mutton-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRecipe.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="mutton-step-btn"
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

export default RecipesPureMutton;