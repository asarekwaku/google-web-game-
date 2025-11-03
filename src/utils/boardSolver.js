// Boggle board solver using DFS (Depth-First Search) algorithm

// 8-directional neighbors: up, down, left, right, and 4 diagonals
const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1]
];

// Check if coordinates are within board bounds
function isValidPosition(row, col, size) {
  return row >= 0 && row < size && col >= 0 && col < size;
}

// DFS function to find all valid words on the board
function dfs(board, row, col, visited, currentWord, trie, foundWords, size) {
  // Mark current position as visited
  visited[row][col] = true;
  
  // Add current letter to word (handle 'Q' -> 'QU' special case)
  const letter = board[row][col];
  const nextWord = currentWord + (letter === 'Q' ? 'QU' : letter);
  
  // Check if current prefix exists in trie (pruning)
  if (!trie.startsWith(nextWord)) {
    visited[row][col] = false;
    return;
  }
  
  // If it's a complete word and long enough, add it
  if (nextWord.length >= 3 && trie.search(nextWord)) {
    foundWords.add(nextWord.toUpperCase());
  }
  
  // Explore all 8 neighboring cells
  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;
    
    // Check if neighbor is valid and not visited
    if (isValidPosition(newRow, newCol, size) && !visited[newRow][newCol]) {
      dfs(board, newRow, newCol, visited, nextWord, trie, foundWords, size);
    }
  }
  
  // Backtrack: unmark current position
  visited[row][col] = false;
}

// Main solver function: finds all valid words on the board
export function solveBoard(board, trie) {
  if (!board || !board.length || !trie) {
    return new Set();
  }
  
  const size = board.length;
  const foundWords = new Set();
  
  // Initialize visited matrix
  const visited = Array(size).fill(null).map(() => Array(size).fill(false));
  
  // Start DFS from every cell on the board
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      dfs(board, row, col, visited, '', trie, foundWords, size);
    }
  }
  
  return foundWords;
}

