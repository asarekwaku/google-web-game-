# Boggle Word Game

A fully functional web-based Boggle game built with React. Find words by connecting adjacent letters on the board using either click-and-drag selection or text input.
<img width="1293" height="825" alt="image" src="https://github.com/user-attachments/assets/c3db84fe-0cd4-4b72-b80a-069caba8bbc4" />


## Features

- 🎮 **Interactive Gameplay**: Play Boggle with custom grid sizes (3x3 to 10x10)
- 🖱️ **Click-to-Select**: Click and drag across tiles to form words visually
- ⌨️ **Text Input**: Type words manually for a traditional experience
- 🎯 **Word Validation**: Validates words against dictionary and board adjacency rules
- ⏱️ **Timer**: Tracks game time automatically
- 📊 **Score Tracking**: Score based on word length
- 📝 **Game Summary**: View found words, missed words, and total time at game end
- 🔍 **Board Solver**: Uses DFS algorithm with Trie to find all valid words on the board

## Game Rules

1. **Minimum Word Length**: Words must be at least 3 letters long
2. **Adjacency Rule**: Letters must be adjacent horizontally, vertically, or diagonally
3. **No Tile Reuse**: Each tile can only be used once per word
4. **Dictionary Validation**: Words must exist in the game's dictionary
5. **Q = QU**: The letter Q is treated as "QU" in words
6. **No Duplicates**: Each word can only be counted once per game

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/asarekwaku/google-web-game-.git
cd google-web-game-
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Play

### Starting a Game

1. Select your desired grid size (3x3 to 10x10) from the dropdown
2. Click "START A NEW GAME!" to begin
3. A random board will be generated and the timer will start

### Finding Words

**Method 1: Click-and-Drag**
- Click and hold on a letter tile
- Drag to adjacent tiles to form a word
- Release the mouse to submit the word
- Selected tiles will be highlighted in blue

**Method 2: Text Input**
- Type your word in the text input field
- Press Enter to submit
- The game validates the word against adjacency rules and dictionary

### Ending a Game

- Click "END GAME" when you're finished
- View your results:
  - Total words found
  - Total time elapsed
  - List of missed words

## Project Structure

```
google-web-game-/
├── public/
│   ├── dictionary.txt      # Word dictionary (3000+ words)
│   └── ...
├── src/
│   ├── components/
│   │   ├── Board.js        # Game board display
│   │   ├── GameControls.js # Start/End game and grid size selector
│   │   ├── GameSummary.js  # End game summary display
│   │   ├── GuessInput.js   # Text input for word guesses
│   │   ├── Header.js       # App header/logo
│   │   └── WordList.js     # Display found words
│   ├── utils/
│   │   ├── boggleUtils.js  # Board generation utilities
│   │   ├── boardSolver.js  # DFS algorithm to solve board
│   │   ├── trie.js         # Trie data structure for dictionary
│   │   └── wordValidator.js # Validates word formation on board
│   ├── App.js              # Main app component with state management
│   └── ...
└── package.json
```

## Technologies Used

- **React 19.2.0** - UI library
- **Material-UI (MUI) 7.3.4** - Component library and styling
- **React Hooks** - State management (useState, useEffect)
- **Trie Data Structure** - Efficient dictionary lookups
- **DFS Algorithm** - Board solving and word validation

## Key Algorithms

### Board Generation
- Uses weighted letter distribution based on Boggle/Scrabble frequencies
- Generates random N×N boards with realistic letter distribution

### Word Solver
- Depth-First Search (DFS) algorithm
- Explores all 8-directional paths from each starting position
- Uses Trie for efficient prefix matching and pruning
- Tracks visited tiles to prevent reuse

### Word Validation
- Validates adjacency rules for manually typed words
- Ensures consecutive letters are adjacent on the board
- Prevents tile reuse within a single word

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App for full configuration control

## Customization

### Dictionary
Edit `public/dictionary.txt` to add or remove words. Each word should be on a separate line.

### Grid Sizes
Modify the grid size options in `src/components/GameControls.js` (currently 3-10).

### Scoring
Adjust scoring logic in `src/App.js` in the `handleGuessSubmit` function.

## Future Enhancements

- [ ] Sound effects for correct/incorrect words
- [ ] Difficulty levels (easy/medium/hard board generation)
- [ ] Multiplayer mode
- [ ] Leaderboard
- [ ] Word definitions
- [ ] Animation effects for found words

## License

This project is open source and available for personal and educational use.

## Acknowledgments

- Built following the "Thinking in React" methodology
- Inspired by the classic Boggle word game
- Uses standard Boggle rules and gameplay mechanics

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

---

Enjoy playing Boggle! 🎮📝
