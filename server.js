const express = require('express');
const path = require('path');

const app = express();
const PORT = 5001;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'view_dungeon', 'build')));

app.get('/api/characters', (req, res) => {
  const characters = [
    { name: 'Warrior', hp: 125, dpMin: 35, dpMax: 60, blockChance: 80 },
    { name: 'Priestess', hp: 75, dpMin: 25, dpMax: 45, blockChance: 70 },
    { name: 'Thief', hp: 75, dpMin: 20, dpMax: 40, blockChance: 80 },
  ];
  res.json(characters);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'view_dungeon', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
