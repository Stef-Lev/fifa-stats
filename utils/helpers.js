const Player = require('../models/player');
const Game = require('../models/game');

const calcWinner = (obj) => {
  const { home, away } = obj.opponents;
  if (home.goals > away.goals) {
    home.points = 3;
    obj.winner.push(home.player);
  } else if (home.goals < away.goals) {
    away.points = 3;
    obj.winner.push(away.player);
  } else if (home.goals === away.goals) {
    home.points = 1;
    away.points = 1;
    obj.winner.push(home.player);
    obj.winner.push(away.player);
  }
  obj.score = `${home.goals} - ${away.goals}`;
  return obj;
};

const updateTournamentStats = (player, game, tournament) => {
  const points = Object.values(game.opponents).find(
    (item) => item.player._id === player._id,
  ).points;
  const goalsFor = parseInt(
    Object.values(game.opponents).find((item) => item.player._id === player._id)
      .goals,
    10,
  );
  const goalsAgainst = parseInt(
    Object.values(game.opponents).find((item) => item.player._id !== player._id)
      .goals,
    10,
  );
  tournament.participants.filter(
    (item) => item.player.id === String(player.id),
  )[0].goals.for += goalsFor;
  tournament.participants.filter(
    (item) => item.player.id === String(player.id),
  )[0].goals.against += goalsAgainst;
  tournament.participants.filter(
    (item) => item.player.id === String(player.id),
  )[0].points += points;
};

const calculateResults = (points, player) => {
  switch (points) {
    case 0:
      player.games_played.statistics.lost += 1;
      break;
    case 1:
      player.games_played.statistics.drawn += 1;
      break;
    case 3:
      player.games_played.statistics.won += 1;
      break;
  }
};

const updatePlayerData = async (participant, tournament) => {
  // Select a user and find his games
  const player = await Player.findById(participant.player.id).populate(
    'games_played.list',
  );
  const playerGames = tournament.games.filter(
    (item) =>
      item.opponents.home.player == player.id ||
      item.opponents.away.player == player.id,
  );
  // Add games to list
  for (let i = 0; i < playerGames.length; i++) {
    const game = await Game.findById(playerGames[i].id);
    player.games_played.list.push(game);
  }
  player.games_played.statistics.total += playerGames.length;

  // console.log(tournament.games)
  //Update goals and stats
  tournament.games.map((item) => {
    const { home, away } = item.opponents;
    if (home.player == player.id) {
      player.goals.for += home.goals;
      player.goals.against += away.goals;
      calculateResults(home.points, player);
    } else if (away.player == player.id) {
      player.goals.for += away.goals;
      player.goals.against += home.goals;
      calculateResults(away.points, player);
    }
  })

  player.tournaments_played.total += 1;
  const champ = tournament.participants[0];

  if (player.id == champ.player.id) {
    player.tournaments_played.won += 1;
    tournament.winner = player;
    await tournament.save();
  }
  await player.save();
};

exports.calcWinner = calcWinner;
exports.updatePlayerData = updatePlayerData;
exports.updateTournamentStats = updateTournamentStats;
