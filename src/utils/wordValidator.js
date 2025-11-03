// Validates if a word can be formed on the board following Boggle adjacency rules

// 8-directional neighbors
const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

// Convert word to match board letters (handle QU case)
function wordToLetterSequence(word) {
  const sequence = [];
  let i = 0;
  while (i < word.length) {
    if (word[i] === 'Q' && i + 1 < word.length && word[i + 1] === 'U') {
      sequence.push('Q');
      i += 2; // Skip both Q and U
    } else {
      sequence.push(word[i]);
      i += 1;
    }
  }
  return sequence;
}

// Check if position is within board bounds
function isValidPosition(row, col, boardSize) {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}

// DFS to find if word can be formed starting from a position
function canFormWordFromPosition(board, letterSequence, letterIndex, row, col, visited, boardSize) {
  // If we've matched all letters, the word can be formed
  if (letterIndex >= letterSequence.length) {
    return true;
  }

  // Check if current position matches the current letter we're looking for
  const targetLetter = letterSequence[letterIndex].toUpperCase();
  if (board[row][col].toUpperCase() !== targetLetter) {
    return false;
  }

  // Mark current position as visited
  visited[row][col] = true;

  // If this is the last letter, we've found the word
  if (letterIndex === letterSequence.length - 1) {
    visited[row][col] = false; // Backtrack
    return true;
  }

  // Try all adjacent positions for the next letter
  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    // Check if neighbor is valid and not visited
    if (isValidPosition(newRow, newCol, boardSize) && !visited[newRow][newCol]) {
      if (canFormWordFromPosition(board, letterSequence, letterIndex + 1, newRow, newCol, visited, boardSize)) {
        visited[row][col] = false; // Backtrack
        return true;
      }
    }
  }

  // Backtrack: unmark current position
  visited[row][col] = false;
  return false;
}

// Main validation function: checks if word can be formed on board following adjacency rules
export function canFormWordOnBoard(board, word) {
  if (!board || !board.length || !word) {
    return false;
  }

  const boardSize = board.length;
  const letterSequence = wordToLetterSequence(word.toUpperCase());

  // Word must be at least 3 characters after Q->QU conversion
  if (letterSequence.length < 3) {
    return false;
  }

  // Try starting from every position on the board
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      // Initialize visited matrix for this starting position
      const visited = Array(boardSize).fill(null).map(() => Array(boardSize).fill(false));
      
      if (canFormWordFromPosition(board, letterSequence, 0, row, col, visited, boardSize)) {
        return true;
      }
    }
  }

  return false;
}

