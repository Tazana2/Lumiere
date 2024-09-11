import React, { useState } from 'react';
import '../styles/PairExercises.css'; // Asegúrate de importar el archivo CSS

export default function PairExercises() {
  const [gameState, setGameState] = useState('playing'); // 'playing', 'completed'
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [matches, setMatches] = useState([]);

  const words = ['Feliz', 'Triste', 'Enojado', 'Sorprendido'];
  const emojis = ['😊', '😢', '😠', '😲'];

  const handleOK = () => {
    if (selectedWord !== null && selectedEmoji !== null) {
      if (words[selectedWord] === words[emojis.indexOf(emojis[selectedEmoji])]) {
        setMatches([...matches, words[selectedWord]]);
      }
      setSelectedWord(null);
      setSelectedEmoji(null);
    }
  };

  const handleContinuar = () => {
    if (matches.length === words.length) {
      setGameState('completed');
    }
  };

  return (
    <div className="pair-exercises">
      <h1 className="title">¡Encuentra las parejas!</h1>
      <div className="matching-container">
        <div className="word-container">
          {words.map((word, index) => (
            <button
              key={word}
              className={`word-button ${selectedWord === index ? 'selected' : ''} ${matches.includes(word) ? 'matched' : ''}`}
              onClick={() => setSelectedWord(index)}
              disabled={matches.includes(word) || gameState === 'completed'}
            >
              {word}
            </button>
          ))}
        </div>
        <div className="emoji-container">
          {emojis.map((emoji, index) => (
            <button
              key={emoji}
              className={`emoji-button ${selectedEmoji === index ? 'selected' : ''} ${matches.includes(words[index]) ? 'matched' : ''}`}
              onClick={() => setSelectedEmoji(index)}
              disabled={matches.includes(words[index]) || gameState === 'completed'}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
      <button className="button ok" onClick={handleOK} disabled={gameState === 'completed'}>
        OK
      </button>
      <button 
        className="button continuar" 
        onClick={handleContinuar}
        disabled={matches.length !== words.length || gameState === 'completed'}
      >
        CONTINUAR
      </button>
    </div>
  );
}
