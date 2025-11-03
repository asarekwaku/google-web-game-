import React from 'react';
import './WordList.css';

function WordList({ foundWords }) {
  return (
    <div className="Word-list">
      <h4>Found Words: {foundWords.length}</h4>
      <ul>
        {foundWords.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default WordList;

