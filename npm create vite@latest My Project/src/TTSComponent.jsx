// src/components/TTSComponent.jsx
import React, { useState } from 'react';
import './TTSComponent.css';

const TTSComponent = () => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState('nova');

    const convertToSpeech = async () => {
        if (!text.trim()) {
            alert('Please enter some text');
            return;
        }

        setIsLoading(true);
        
        try {
            // Pollinations TTS API - Free, supports English & Urdu
            const response = await fetch(
                `https://text.pollinations.ai/${encodeURIComponent(text)}?voice=${selectedVoice}&model=tts-1-hd`
            );
            
            if (!response.ok) throw new Error('API request failed');
            
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
            
            audio.onended = () => URL.revokeObjectURL(audioUrl);
            
        } catch (error) {
            console.error('TTS Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const setUrduExample = () => {
        setText('السلام علیکم! آپ کیسے ہیں؟ مجھے آپ سے مل کر خوشی ہوئی۔');
    };

    const setEnglishExample = () => {
        setText('Hello! How are you? Nice to meet you.');
    };

    return (
        <div className="tts-card">
            <h2 className="tts-title">🎤 Pollinations TTS API</h2>
            <p className="tts-subtitle">English & Urdu Support | High Quality Neural Voices</p>
            
            <div className="button-group">
                <button onClick={setUrduExample} className="btn-example">📝 Urdu Example</button>
                <button onClick={setEnglishExample} className="btn-example">📝 English Example</button>
            </div>
            
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type in English or Urdu...&#10;Example: السلام علیکم! یا Hello world!"
                className="tts-textarea"
                rows="4"
            />
            
            <select 
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="tts-select"
            >
                <option value="nova">Nova (Best for Urdu) ✨</option>
                <option value="alloy">Alloy (Neutral)</option>
                <option value="echo">Echo (Male)</option>
                <option value="fable">Fable (British)</option>
                <option value="onyx">Onyx (Deep Male)</option>
                <option value="shimmer">Shimmer (Female)</option>
            </select>
            
            <button 
                onClick={convertToSpeech} 
                disabled={isLoading || !text.trim()}
                className="tts-btn"
            >
                {isLoading ? '🎵 Generating...' : '🔊 Convert to Speech'}
            </button>
            
            <p className="tts-note">
                💡 Tip: Add emotion tags like [happy], [serious], [excited] before your text!
            </p>
        </div>
    );
};

export default TTSComponent;