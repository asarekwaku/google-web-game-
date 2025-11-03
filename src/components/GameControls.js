import React from 'react';
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import './GameControls.css';

function GameControls({ gameState, gridSize, onGridSizeChange, onStartGame, onEndGame }) {
  const handleChange = (event) => {
    onGridSizeChange(event.target.value);
  };

  return (
    <div className="Game-controls">
      {gameState === 'MENU' && (
        <>
          <Button variant="contained" onClick={onStartGame}>
            START A NEW GAME!
          </Button>
          <div className="Input-select-size">
            <FormControl>
              <Select
                labelId="sizelabel"
                id="sizemenu"
                value={gridSize}
                onChange={handleChange}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
              <FormHelperText>Set Grid Size</FormHelperText>
            </FormControl>
          </div>
        </>
      )}
      
      {gameState === 'PLAYING' && (
        <Button variant="contained" color="error" onClick={onEndGame}>
          END GAME
        </Button>
      )}
      
      {gameState === 'FINISHED' && (
        <Button variant="contained" onClick={onStartGame}>
          START A NEW GAME!
        </Button>
      )}
    </div>
  );
}

export default GameControls;

