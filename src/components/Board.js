import Paper from "@mui/material/Paper";
import React, { useEffect } from 'react';
import './Board.css';

function Board({ board, selectedPath = [], onTileMouseDown, onTileMouseEnter, onMouseUp, onMouseLeave }) {
  const isSelected = (row, col) => {
    return selectedPath.some(([r, c]) => r === row && c === col);
  };

  // Add global mouse up listener to handle mouse release outside the board
  // Hooks must be called before any early returns
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (onMouseUp) {
        onMouseUp();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [onMouseUp]);

  if (!board || board.length === 0) {
    return null;
  }

  return (
    <div 
      className="Board-div" 
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
    >
      <div className="board-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((letter, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className="Tile"
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (onTileMouseDown) {
                    onTileMouseDown(rowIndex, colIndex);
                  }
                }}
                onMouseEnter={() => {
                  if (onTileMouseEnter) {
                    onTileMouseEnter(rowIndex, colIndex);
                  }
                }}
              >
                <Paper 
                  elevation={4}
                  className={isSelected(rowIndex, colIndex) ? 'selected' : ''}
                >
                  {letter}
                </Paper>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;

