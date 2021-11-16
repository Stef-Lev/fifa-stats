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

const updatePlayerOnGame = (player, game) => {
  player.games_played.list.push(game);
  const { statistics } = player.games_played;
  statistics.total++;
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
  if (points === 3) {
    statistics.won++;
  } else if (points === 1) {
    statistics.drawn++;
  } else if (points === 0) {
    statistics.lost++;
  }
  player.goals.for += goalsFor;
  player.goals.against += goalsAgainst;
};

const updateTournamentStats = (tournament) => {
  //add goals for, against, points
};

exports.calcWinner = calcWinner;
exports.updatePlayerOnGame = updatePlayerOnGame;
exports.updateTournamentStats = updateTournamentStats;
