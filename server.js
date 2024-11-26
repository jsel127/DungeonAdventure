const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors({
  origin: 'http://localhost:3002'  
}));

app.get('/api/characters', (req, res) => {
  const characters = DungeonAdventure.getAllCharacters();
  res.json(characters);
});

app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
