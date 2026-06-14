import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipePlainVegetables.css';

const RecipePlainVegetables = () => {
  const navigate = useNavigate();
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/plain-vegetables?limit=200')
      .then(res => res.json())
      .then(data => {
        setVegetables(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vegetable recipes:', error);
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

  const handleVegetableSelect = (vegetable) => {
    setSelectedVegetable(vegetable);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedVegetable(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="vegetables-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious vegetable recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vegetables-page">
      <header className="vegetables-header">
        <div className="vegetables-header-content">
          <h1 className="vegetables-page-title">Plain Vegetables</h1>
          <p className="vegetables-page-description">
            Discover traditional Pakistani vegetable recipes - simple, healthy, and homestyle taste
          </p>
        </div>
      </header>
      <main className="vegetables-main">
        <div className="vegetables-grid-section">
          <div className="vegetables-grid">
            {vegetables.map(vegetable => (
              <div
                key={vegetable._id}
                className="vegetables-card"
                onClick={() => handleVegetableSelect(vegetable)}
              >
                <div
                  className="vegetables-card-image"
                  style={{ backgroundImage: `url(${vegetable.image})` }}
                ></div>
                <div className="vegetables-card-content">
                  <h3 className="vegetables-card-title">{vegetable.title}</h3>
                  {/* ✅ Subtitle removed - sirf title show hoga */}
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
      {showDetailPanel && selectedVegetable && (
        <div className="vegetables-modal-overlay" onClick={closeDetailPanel}>
          <div className="vegetables-modal" onClick={e => e.stopPropagation()}>
            <div className="veg-modal-hero">
              <div className="veg-modal-hero-left">
                <span className="veg-modal-tag">Vegetable Recipe</span>
                <h2 className="veg-modal-hero-title">{selectedVegetable.title}</h2>
                {selectedVegetable.tagline && (
                  <p className="veg-modal-hero-tagline">{selectedVegetable.tagline}</p>
                )}
              </div>
              <div className="veg-modal-hero-right">
                <img
                  src={selectedVegetable.image}
                  alt={selectedVegetable.title}
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
                  {selectedVegetable.ingredientsRaw?.map((ingredient, idx) => (
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
                  {selectedVegetable.stepsRaw?.map((step, idx) => (
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
                  <span>Step {currentStep} of {selectedVegetable.stepsRaw?.length || 0}</span>
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
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedVegetable.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="veg-step-btn"
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

export default RecipePlainVegetables;