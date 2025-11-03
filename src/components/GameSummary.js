import React from 'react';
import './GameSummary.css';

function GameSummary({ foundWords, missedWords, time }) {
  const formattedTime = time.toFixed(2);

  return (
    <div className="Game-summary">
      <div className="Summary">
        <h2>SUMMARY</h2>
        <div>
          <li>Total Words Found: {foundWords.length}</li>
        </div>
        <div>
          <li>Total Time: {formattedTime} secs</li>
        </div>
      </div>
      
      <div className="Found-solutions-list">
        <h4>Missed Words: {missedWords.length}</h4>
        <ul>
          {missedWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GameSummary;

