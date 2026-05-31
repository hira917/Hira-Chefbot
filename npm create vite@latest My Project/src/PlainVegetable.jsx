import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlainVegetable.css';

const PlainVegetable = () => {
  const navigate = useNavigate();
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH PLAIN VEGETABLES FROM BACKEND
  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/plain-vegetables?limit=200')
      .then(res => res.json())
      .then(data => {
        // Filter out any mutton recipes (just in case)
        const vegetarianRecipes = (data.recipes || []).filter(recipe => {
          const title = recipe.title?.toLowerCase() || '';
          const description = recipe.description?.toLowerCase() || '';
          const ingredients = (recipe.ingredientsRaw || []).join(' ').toLowerCase();
          
          // Skip if contains mutton or meat in title, description, or ingredients
          const hasMutton = title.includes('mutton') || 
                            description.includes('mutton') || 
                            ingredients.includes('mutton') ||
                            title.includes('meat') ||
                            description.includes('meat');
          
          return !hasMutton;
        });
        
        setVegetables(vegetarianRecipes);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vegetable recipes:', error);
        setLoading(false);
      });
  }, []);

  // Voice functions
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
    if (selectedVegetable && currentStep < selectedVegetable.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedVegetable.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedVegetable && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedVegetable.stepsRaw, currentStep - 2);
    }
  };

  const handleVegetableClick = (vegetable) => {
    setSelectedVegetable(vegetable);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const handleCloseModal = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedVegetable(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  // Loading state
  if (loading) {
    return (
      <div className="plain-vegetable-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious vegetable recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="plain-vegetable-page">

      {/* Header */}
      <header className="plain-vegetable-header">
        <div className="plain-vegetable-header-content">
          <h1 className="plain-vegetable-page-title">Plain Vegetables</h1>
          <p className="plain-vegetable-page-description">
            Discover traditional Pakistani vegetable recipes - simple, healthy, and homestyle taste
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="plain-vegetable-main">
        <div className="plain-vegetable-grid-section">
          <div className="plain-vegetable-grid">
            {vegetables.map((vegetable) => (
              <div
                key={vegetable._id}
                className="plain-vegetable-card"
                onClick={() => handleVegetableClick(vegetable)}
              >
                <div
                  className="plain-vegetable-card-image"
                  style={{ backgroundImage: `url(${vegetable.image})` }}
                ></div>
                <div className="plain-vegetable-card-content">
                  <h3 className="plain-vegetable-card-title">{vegetable.title}</h3>
                  <p className="plain-vegetable-card-description">{vegetable.tagline || 'Traditional Pakistani recipe'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate('/lunch')}>
          <span>←</span> Back to Lunch Categories
        </button>
      </div>

      {/* MODAL - UPDATED CLASS NAMES */}
      {showDetailPanel && selectedVegetable && (
        <div className="plain-vegetable-modal-overlay" onClick={handleCloseModal}>
          <div className="plain-vegetable-modal" onClick={e => e.stopPropagation()}>

            {/* HERO BANNER - NEW STRUCTURE: Left Text + Right Image */}
            <div className="pv-modal-hero">
              
              {/* Left side - Content Area */}
              <div className="pv-modal-hero-left">
                <span className="pv-modal-tag">Vegetable</span>
                <h2 className="pv-modal-hero-title">{selectedVegetable.title}</h2>
                {selectedVegetable.tagline && (
                  <p className="pv-modal-hero-tagline">{selectedVegetable.tagline}</p>
                )}
              </div>
              
              {/* Right side - Image Area */}
              <div className="pv-modal-hero-right">
                <img 
                  className="pv-modal-hero-img"
                  src={selectedVegetable.image} 
                  alt={selectedVegetable.title}
                />
              </div>
              
              {/* Close button */}
              <button className="plain-vegetable-modal-close" onClick={handleCloseModal}>×</button>
            </div>

            {/* BODY: ingredients + steps side by side - UPDATED CLASS NAMES */}
            <div className="pv-modal-body">

              {/* INGREDIENTS */}
              <div className="pv-modal-col">
                <div className="pv-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="pv-modal-scroll">
                  {selectedVegetable.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="pv-ingredient-item">
                      <span className="pv-ingredient-dot"></span>
                      <span className="pv-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEPS */}
              <div className="pv-modal-col pv-modal-col--steps">
                <div className="pv-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="pv-modal-scroll">
                  {selectedVegetable.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="pv-step-item">
                      <span className="pv-step-num">{idx + 1}</span>
                      <span className="pv-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* VOICE BAR (pinned bottom) - UPDATED CLASS NAMES */}
            <div className="pv-voice-bar">
              <div className="pv-voice-left">
                <i className="fas fa-volume-up pv-voice-icon"></i>
                <span className="pv-voice-label">Voice Guide</span>
              </div>

              <div className="pv-voice-progress">
                <div className="pv-progress-track">
                  <div className="pv-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="pv-progress-info">
                  <span>Step {currentStep} of {selectedVegetable.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="pv-voice-controls">
                <button
                  className="pv-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`pv-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedVegetable.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="pv-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedVegetable.stepsRaw?.length || 0)}
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

export default PlainVegetable;