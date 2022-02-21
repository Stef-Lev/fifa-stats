require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const mongoose = require('mongoose');
const auth = require('./utils/auth');
const bodyParser = require('body-parser');
const database = findDatabase(process.env.NODE_ENV);
const databaseName = database.split('/')[3].split('?')[0].toUpperCase();
const player = require('./routes/playerRoute');
const game = require('./routes/gameRoute');
const tournament = require('./routes/tournamentRoute');
const userAuth = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const jwtSecret = process.env.JWT_SECRET;
const path = require('path');

mongoose.connect(database);

function findDatabase(env) {
  switch (env) {
    case 'production':
      return process.env.MONGODB_URI;
    case 'development':
      return process.env.MONGO_DEV_URI;
    case 'demo':
      return process.env.MONGO_DEMO_URI;
    default:
      return process.env.MONGO_DEV_URI;
  }
}

const db = mongoose.connection;
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
db.on('error', () => console.error('Error'));
db.once('open', () => {
  console.log(`Database ${databaseName} connected...`);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json(), urlEncodedParser);
app.use(cookieParser(jwtSecret));

// Authentication
app.post('/api/auth/register', userAuth.registerPlayer);
app.post('/api/auth/login', userAuth.loginPlayer);
app.get('/api/auth/logout', userAuth.logoutPlayer);
app.get('/api/auth/player', userAuth.checkPlayer);

// Players
app.post('/api/players', player.add);
app.get('/api/players', player.list);
app.get('/api/players/stats/:id', player.stats);
app.put('/api/players/color/:id', player.updateColor);
app.put('/api/players/role/:id', player.updateRole);

// Tournaments
app.post('/api/tournaments', tournament.add);
app.get('/api/tournaments/complete/:id', tournament.finalize);
app.get('/api/tournaments/:id', tournament.show);
app.get('/api/tournaments', tournament.list);
app.put('/api/tournaments/:id', tournament.update);
app.delete('/api/tournaments/:id', tournament.cancel);

// Games
app.post('/api/games', game.add);
app.get('/api/games', game.list);
app.get('/api/games/:id', game.getOne);
app.delete('/api/tournaments/:tid/game/:gid', game.delete);

//fix login auth and blank page
if (process.env.NODE_ENV === 'production') {
  const root = require('path').resolve(__dirname, 'client', 'build');
  app.use(express.static(root));
  app.get('*', (req, res) => {
    res.sendFile('index.html', { root });
  });
} else {
  app.get('/', (req, res) => {
    res.send('API running');
  });
}

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
