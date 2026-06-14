import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Soups.css';

const Soups = () => {
  const navigate = useNavigate();
  const [soups, setSoups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSoup, setSelectedSoup] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/soups?limit=200')
      .then(res => res.json())
      .then(data => {
        setSoups(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching soups:', error);
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
    if (selectedSoup && currentStep < selectedSoup.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedSoup.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedSoup && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedSoup.stepsRaw, currentStep - 2);
    }
  };

  const handleSoupSelect = (soup) => {
    setSelectedSoup(soup);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedSoup(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const handleBackToLunchCategories = () => {
    navigate('/lunch-categories');
  };

  if (loading) {
    return (
      <div className="soups-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious soups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="soups-page">

      {/* Header */}
      <header className="soups-header">
        <div className="soups-header-content">
          <h1 className="soups-page-title">Soup Recipe Collection</h1>
          <p className="soups-page-description">
            A curated selection of comforting and flavorful soups from around the world.
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="soups-main">
        <div className="soups-grid-section">
          <div className="soups-grid">
            {soups.map(soup => (
              <div
                key={soup._id}
                className="soups-card"
                onClick={() => handleSoupSelect(soup)}
              >
                <div
                  className="soups-card-image"
                  style={{ backgroundImage: `url(${soup.image})` }}
                ></div>
                <div className="soups-card-content">
                  <h3 className="soups-card-title">{soup.title}</h3>
                  {/* ✅ Subtitle removed - sirf title show hoga */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-home-btn" onClick={handleBackToLunchCategories}>
          <span>←</span> Back to Lunch Categories
        </button>
      </div>

      {/* MODAL */}
      {showDetailPanel && selectedSoup && (
        <div className="soups-modal-overlay" onClick={closeDetailPanel}>
          <div className="soups-modal" onClick={e => e.stopPropagation()}>

            {/* ── HERO: left = text info, right = full image ── */}
            <div className="soups-modal-hero">

              {/* LEFT side: dark bg with text */}
              <div className="soups-modal-hero-left">
                <span className="soups-modal-tag">Soup Recipe</span>
                <h2 className="soups-modal-hero-title">{selectedSoup.title}</h2>
                {selectedSoup.tagline && (
                  <p className="soups-modal-hero-tagline">{selectedSoup.tagline}</p>
                )}
              </div>

              {/* RIGHT side: image displayed fully */}
              <div className="soups-modal-hero-right">
                <img
                  src={selectedSoup.image}
                  alt={selectedSoup.title}
                  className="soups-modal-hero-img"
                />
              </div>

              {/* Close button — sits on top right corner of the whole hero */}
              <button className="soups-modal-close" onClick={closeDetailPanel}>×</button>

            </div>

            {/* ── BODY: ingredients + steps side by side ── */}
            <div className="soups-modal-body">

              {/* INGREDIENTS */}
              <div className="soups-modal-col">
                <div className="soups-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="soups-modal-scroll">
                  {selectedSoup.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="soups-ingredient-item">
                      <span className="soups-ingredient-dot"></span>
                      <span className="soups-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEPS */}
              <div className="soups-modal-col soups-modal-col--steps">
                <div className="soups-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="soups-modal-scroll">
                  {selectedSoup.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="soups-step-item">
                      <span className="soups-step-num">{idx + 1}</span>
                      <span className="soups-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── VOICE BAR (pinned bottom) ── */}
            <div className="soups-voice-bar">
              <div className="soups-voice-left">
                <i className="fas fa-volume-up soups-voice-icon"></i>
                <span className="soups-voice-label">Voice Guide</span>
              </div>

              <div className="soups-voice-progress">
                <div className="soups-progress-track">
                  <div className="soups-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="soups-progress-info">
                  <span>Step {currentStep} of {selectedSoup.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="soups-voice-controls">
                <button
                  className="soups-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`soups-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedSoup.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="soups-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedSoup.stepsRaw?.length || 0)}
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

export default Soups;