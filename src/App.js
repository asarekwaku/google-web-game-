import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import GameControls from './components/GameControls.js';
import Board from './components/Board.js';
import GuessInput from './components/GuessInput.js';
import WordList from './components/WordList.js';
import GameSummary from './components/GameSummary.js';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { generateBoard } from './utils/boggleUtils.js';
import { solveBoard } from './utils/boardSolver.js';
import { canFormWordOnBoard } from './utils/wordValidator.js';
import Trie from './utils/trie.js';
import './App.css';

function App() {
  // Game flow state
  const [gameState, setGameState] = useState('MENU'); // 'MENU', 'PLAYING', 'FINISHED'
  const [gridSize, setGridSize] = useState(4);

  // Game data
  const [board, setBoard] = useState(null);
  const [solution, setSolution] = useState(new Set());
  const [trie, setTrie] = useState(null);

  // Player progress
  const [foundWords, setFoundWords] = useState([]);
  const [selectedPath, setSelectedPath] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [currentGuess, setCurrentGuess] = useState('');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);

  // UI Feedback
  const [message, setMessage] = useState(null);
  const [messageSeverity, setMessageSeverity] = useState('success');

  // Load dictionary and build trie on mount
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const response = await fetch('/dictionary.txt');
        const text = await response.text();
        const words = text.split('\n').map(word => word.trim().toUpperCase()).filter(word => word.length >= 3);
        
        const dictionaryTrie = new Trie();
        words.forEach(word => {
          dictionaryTrie.insert(word);
        });
        
        setTrie(dictionaryTrie);
      } catch (error) {
        console.error('Error loading dictionary:', error);
        // Create a minimal trie with a few words as fallback
        const fallbackTrie = new Trie();
        ['THE', 'CAT', 'DOG', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL'].forEach(word => {
          fallbackTrie.insert(word);
        });
        setTrie(fallbackTrie);
      }
    };

    loadDictionary();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameState === 'PLAYING') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameState]);

  // Show message helper
  const showMessage = (text, severity = 'info') => {
    setMessage(text);
    setMessageSeverity(severity);
  };

  // Start game handler
  const handleStartGame = () => {
    if (!trie) {
      showMessage('Dictionary still loading...', 'warning');
      return;
    }

    const newBoard = generateBoard(gridSize);
    setBoard(newBoard);
    
    const allSolutions = solveBoard(newBoard, trie);
    setSolution(allSolutions);
    
    setFoundWords([]);
    setSelectedPath([]);
    setIsSelecting(false);
    setCurrentGuess('');
    setScore(0);
    setTimer(0);
    setMessage(null);
    
    setGameState('PLAYING');
  };

  // End game handler
  const handleEndGame = () => {
    setGameState('FINISHED');
  };

  // Guess submit handler
  const handleGuessSubmit = (guess) => {
    const upperGuess = guess.toUpperCase().trim();

    // Validation
    if (upperGuess.length < 3) {
      showMessage('Words must be at least 3 letters!', 'error');
      return;
    }

    if (foundWords.includes(upperGuess)) {
      showMessage('Word already found!', 'error');
      return;
    }

    // First check if word can be formed on board following adjacency rules
    if (!canFormWordOnBoard(board, upperGuess)) {
      showMessage(`"${upperGuess}" cannot be formed on this board following adjacency rules.`, 'error');
      return;
    }

    // Then check if word is in the dictionary and solution set
    if (solution.has(upperGuess)) {
      // Correct!
      setFoundWords(prev => [...prev, upperGuess]);
      setScore(prev => prev + upperGuess.length);
      showMessage(`Great! "${upperGuess}" is correct!`, 'success');
    } else {
      showMessage(`"${upperGuess}" is not in the dictionary.`, 'error');
    }
  };

  // Check if two positions are valid neighbors (8-directional)
  const isValidNeighbor = (current, next) => {
    if (!board) return false;
    
    const [currRow, currCol] = current;
    const [nextRow, nextCol] = next;
    
    // Check if next position is within bounds
    if (nextRow < 0 || nextRow >= board.length || nextCol < 0 || nextCol >= board[0].length) {
      return false;
    }
    
    // Check if next position is adjacent (including diagonals)
    const rowDiff = Math.abs(nextRow - currRow);
    const colDiff = Math.abs(nextCol - currCol);
    
    return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
  };

  // Build word from selected path
  const buildWordFromPath = (path) => {
    if (!board || path.length === 0) return '';
    
    return path.map(([row, col]) => {
      const letter = board[row][col];
      return letter === 'Q' ? 'QU' : letter;
    }).join('');
  };

  // Handle tile mouse down (start selection)
  const handleTileMouseDown = (row, col) => {
    if (gameState !== 'PLAYING') return;
    
    setIsSelecting(true);
    setSelectedPath([[row, col]]);
    const letter = board[row][col];
    setCurrentGuess(letter === 'Q' ? 'QU' : letter);
  };

  // Handle tile mouse enter (continue selection)
  const handleTileMouseEnter = (row, col) => {
    if (!isSelecting || gameState !== 'PLAYING') return;
    
    // Check if this tile is already in the path
    if (selectedPath.some(([r, c]) => r === row && c === col)) {
      return;
    }
    
    // Get the last position in the path
    const lastPosition = selectedPath[selectedPath.length - 1];
    
    // Check if it's a valid neighbor
    if (isValidNeighbor(lastPosition, [row, col])) {
      const newPath = [...selectedPath, [row, col]];
      setSelectedPath(newPath);
      setCurrentGuess(buildWordFromPath(newPath));
    }
  };

  // Handle mouse up (end selection and submit)
  const handleMouseUp = () => {
    if (!isSelecting || gameState !== 'PLAYING') return;
    
    if (selectedPath.length >= 3) {
      const word = buildWordFromPath(selectedPath).toUpperCase();
      handleGuessSubmit(word);
    }
    
    setIsSelecting(false);
    setSelectedPath([]);
    setCurrentGuess('');
  };

  // Handle board mouse leave (cancel selection)
  const handleBoardMouseLeave = () => {
    if (isSelecting) {
      setIsSelecting(false);
      setSelectedPath([]);
      setCurrentGuess('');
    }
  };

  // Calculate missed words
  const missedWords = gameState === 'FINISHED' 
    ? Array.from(solution).filter(word => !foundWords.includes(word)).sort()
    : [];

  // Close snackbar
  const handleCloseSnackbar = () => {
    setMessage(null);
  };

  return (
    <div className="App">
      <Header />
      
      <div className="section-container toggle-section">
        <GameControls
          gameState={gameState}
          gridSize={gridSize}
          onGridSizeChange={setGridSize}
          onStartGame={handleStartGame}
          onEndGame={handleEndGame}
        />
        <span className="section-label">TOGGLE_STATE</span>
      </div>

      {/* Show Board for both PLAYING and FINISHED states */}
      {(gameState === 'PLAYING' || gameState === 'FINISHED') && (
        <div className="section-container board-section">
          <Board 
            board={board} 
            selectedPath={selectedPath}
            onTileMouseDown={handleTileMouseDown}
            onTileMouseEnter={handleTileMouseEnter}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleBoardMouseLeave}
          />
          {gameState === 'PLAYING' && isSelecting && currentGuess && (
            <div className="current-guess-display">
              Current: <strong>{currentGuess.toUpperCase()}</strong>
            </div>
          )}
          <span className="section-label">BOARD</span>
        </div>
      )}

      {/* Show input and word list only during PLAYING */}
      {gameState === 'PLAYING' && (
        <>
          <div className="section-container guess-section">
            <GuessInput onGuessSubmit={handleGuessSubmit} />
            <span className="section-label">GUESS INPUT</span>
          </div>
          
          <div className="section-container solutions-section">
            <WordList foundWords={foundWords} />
            <span className="section-label">FOUND SOLUTIONS</span>
          </div>
        </>
      )}

      {/* Show summary only when FINISHED */}
      {gameState === 'FINISHED' && (
        <div className="section-container solutions-section">
          <GameSummary
            foundWords={foundWords}
            missedWords={missedWords}
            time={timer}
          />
          <span className="section-label">SUMMARY</span>
        </div>
      )}

      {/* Snackbar for messages */}
      <Snackbar
        open={message !== null}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={messageSeverity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
