require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const player = require('./routes/playerRoute');
const game = require('./routes/gameRoute');
const tournament = require('./routes/tournamentRoute');
const path = require('path');

mongoose.connect(process.env.MONGODB_URI);

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
app.post('/players/clear', player.clear);

// Tournaments
app.post('/tournaments', tournament.add);
app.get('/tournaments/complete/:id', tournament.finalize);
app.get('/tournaments/:id', tournament.show);
app.get('/tournaments', tournament.list);
app.put('/tournaments/:id', tournament.update);
app.delete('/tournaments/:id', tournament.cancel);

// Games
app.post('/games', game.add);
app.get('/games', game.list);
app.get('/games/:id', game.getOne);
app.delete('/tournaments/:tid/game/:gid', game.delete);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'/client/build')));
  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'client','build','index.html'));
  });
} else {
  app.get('/',(req,res) => {
    res.send('API running')
  })
}

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
