import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Soups.css';

const Soups = () => {
  const navigate = useNavigate();
  const [soups, setSoups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSoup, setSelectedSoup] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH SOUPS FROM BACKEND
  useEffect(() => {
fetch('http://localhost:5000/api/recipes/subCategory/soups?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch soups');
        }
        return res.json();
      })
      .then(data => {
        setSoups(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching soups:', error);
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

  const handleGoBack = () => {
    navigate('/');
  };

  // Loading state
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

  // Error state
  if (error) {
    return (
      <div className="soups-page">
        <div className="error-container">
          <p>Error loading soups: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
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

      {/* Soups Grid */}
      <main className="soups-main">
        <div className="soups-grid-section">
          <div className="soups-grid">
            {soups.map(soup => (
              <div 
                key={soup._id} 
                className="soups-technique-card"
                onClick={() => handleSoupSelect(soup)}
              >
                <div 
                  className="soups-card-image"
                  style={{ backgroundImage: `url(${soup.image})` }}
                ></div>
                
                <div className="soups-card-content">
                  <h3 className="soups-card-title">{soup.title}</h3>
                  <p className="soups-card-description">{soup.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Back to Home Button */}
      <div className="back-button-container">
        <button className="back-home-btn" onClick={handleGoBack}>
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>
      </div>

      {/* DETAIL MODAL with SELECTED SOUP IMAGE as Background */}
      {showDetailPanel && selectedSoup && (
        <div className="soups-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="soups-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedSoup.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="soups-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="soups-modal-header">
              <div className="soups-modal-title">
                <h2>{selectedSoup.title}</h2>
              </div>
            </div>

            <div className="soups-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="soups-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="soups-ingredients-list">
                  {selectedSoup.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="soups-ingredient-item">
                      <span className="soups-ingredient-bullet">•</span>
                      <span className="soups-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="soups-modal-steps">
                <h3>Steps to Make</h3>
                <div className="soups-steps-list">
                  {selectedSoup.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="soups-step-item">
                      <span className="soups-step-number">{idx + 1}.</span>
                      <span className="soups-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="soups-modal-voice-container">
                <div className="voice-panel">
                  <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedSoup.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedSoup.stepsRaw)}
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
                        disabled={currentStep >= (selectedSoup.stepsRaw?.length || 0)}
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

export default Soups;