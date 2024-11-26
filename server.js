const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors({
  origin: 'http://localhost:3002'  
}));

app.get('/api/characters', (req, res) => {
  res.json([
    { name: "Warrior", hp: 125, dpMin: 35, dpMax: 60, blockChance: 80 },
    { name: "Priestess", hp: 75, dpMin: 25, dpMax: 45, blockChance: 70 },
    { name: "Thief", hp: 75, dpMin: 20, dpMax: 40, blockChance: 80 }
  ]);
});

app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
