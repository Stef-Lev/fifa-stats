require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8888;
const mongoose = require('mongoose');
const player = require('./routes/playerRoute');
const game = require('./routes/gameRoute');
const tournament = require('./routes/tournamentRoute');

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on('error', () => console.error('Error'));
db.once('open', () => {
  console.log('Database connected...');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Players
app.post('/players', player.add);
app.get('/players', player.list);

// Tournaments
app.post('/tournaments', tournament.add);
app.get('/tournaments/complete/:id', tournament.finalize);
app.get('/tournaments/:id', tournament.show);
app.get('/tournaments', tournament.list);
app.put('/tournaments/:id', tournament.update);

// Games
app.post('/games', game.add);
app.get('/games', game.list);
app.delete('/tournaments/:tid/game/:gid', game.delete);

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
